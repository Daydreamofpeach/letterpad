import {
  QueryTagArgs,
  ResolversTypes,
  Tag,
  TagType,
} from "@/__generated__/__types__";
import { ResolverContext } from "@/graphql/context";
import { isCategory, tryToParseCategoryName } from "@/utils/utils";
import { cache } from "react";

export const getTag = cache(async (
  args: QueryTagArgs,
  { session, client_author_id, prisma }: ResolverContext
): Promise<ResolversTypes["TagResponse"]> => {
  const authorId = session?.user.id || client_author_id;

  if (!authorId) {
    return {
      __typename: "Exception",
      message: "You dont have access to get this resource",
    };
  }

  const tag = await prisma.tag.findFirst({
    where: { slug: args.slug },
  });

  if (tag) {
    return {
      __typename: "Tag",
      ...tag!,
      slug: tag.slug!,
      type: isCategory(tag.name) ? TagType.Category : TagType.Tag,
      name: tryToParseCategoryName(tag.name),
      id: tag.name,
    };
  }
  return {
    __typename: "Exception",
    message: "Tag not found",
  };
});
