import {
  MutationResolvers,
  Navigation,
  NavigationType,
  QueryResolvers,
  SettingResolvers,
} from "@/__generated__/__types__";
import { ResolverContext } from "@/graphql/context";

import {
  getSetting,
  resolveImageField,
  updateSetting,
} from "../services/setting";
import { resolveDesignField } from "../services/setting/resolveDesignField";
import { encryptEmail } from "../../shared/clientToken";

import { Optional } from "@/types";

const Setting: SettingResolvers<ResolverContext> = {
  menu: async (
    { menu, show_about_page, show_tags_page },
    _,
    { dataloaders, client_author_id, session }
  ) => {
    const author = await dataloaders.author.load(
      session?.user.id || client_author_id
    );
    return getMenuWithSanitizedSlug(
      parse(menu),
      !!session?.user,
      author.username,
      show_about_page,
      show_tags_page
    );
  },
  banner: ({ banner }) => resolveImageField(banner),
  site_logo: ({ site_logo }) => resolveImageField(site_logo),
  site_favicon: ({ site_favicon }) => resolveImageField(site_favicon),
  design: ({ design }) => resolveDesignField(design),
  client_token: (__, _, { session }) => {
    return session?.user.email ? encryptEmail(session?.user.email) : "";
  },
};

const Query: QueryResolvers<ResolverContext> = {
  settings: async (_root, args = {}, context) => getSetting(args, context),
};
const Mutation: Optional<MutationResolvers<ResolverContext>> = {
  updateOptions: async (_root, args, context) => updateSetting(args, context),
};

export default { Query, Mutation, Setting };

function getMenuWithSanitizedSlug(
  menu: Navigation[],
  loggedIn: boolean,
  username: string,
  show_about_page?: boolean,
  show_tags_page?: boolean
) {
  const cleanMenu = menu.map((item) => {
    switch (item.type) {
      case "tag":
      case "page":
        item.slug = "/" + item.type + "/" + item.slug;
        break;
    }
    return item;
  });
  if (loggedIn) return cleanMenu;

  if (show_tags_page) {
    cleanMenu.push({
      slug: "/tags",
      label: "Tags",
      type: NavigationType.Page,
      original_name: "Tags",
    });
  }
  if (show_about_page) {
    cleanMenu.push({
      slug: new URL(`@${username}`, process.env.ROOT_URL).href,
      label: "About",
      type: NavigationType.Custom,
      original_name: "About",
    });
  }

  return cleanMenu;
}

const parse = (str: string | object) => {
  return typeof str === "string" ? JSON.parse(str) : str;
};
