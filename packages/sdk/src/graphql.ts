export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AboutStats = {
  __typename?: "AboutStats";
  followerCount: Scalars["Int"];
  followingCount: Scalars["Int"];
  postCount: Scalars["Int"];
};

export type AboutStatsResponse = {
  __typename?: "AboutStatsResponse";
  ok: Scalars["Boolean"];
  stats?: Maybe<AboutStats>;
};

export type AddDomainResponse = Domain | DomainError;

export type Author = {
  __typename?: "Author";
  accessToken?: Maybe<Scalars["String"]>;
  /** @deprecated Use google_analytics instead from settings */
  analytics_id?: Maybe<Scalars["Int"]>;
  /** @deprecated Umami is no longer supported for performance reasons */
  analytics_uuid?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  company_name?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  first_post_published?: Maybe<Scalars["Boolean"]>;
  followers?: Maybe<Array<Maybe<FollowAuthor>>>;
  following?: Maybe<Array<Maybe<FollowAuthor>>>;
  id: Scalars["Int"];
  name: Scalars["String"];
  occupation?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Permissions>>;
  profile_updated?: Maybe<Scalars["Boolean"]>;
  register_step?: Maybe<RegisterStep>;
  role?: Maybe<Role>;
  settings_updated?: Maybe<Scalars["Boolean"]>;
  signature?: Maybe<Scalars["String"]>;
  social?: Maybe<Social>;
  stripe_customer_id?: Maybe<Scalars["String"]>;
  stripe_subscription_id?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
  verified?: Maybe<Scalars["Boolean"]>;
};

export type AuthorResponse =
  | Author
  | Exception
  | Failed
  | NotFound
  | UnAuthorized;

export type CreatePostResponse = Post | PostError;

export type CreateSubscriptionResponse = {
  __typename?: "CreateSubscriptionResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type DeleteAuthorResponse = {
  __typename?: "DeleteAuthorResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type DeleteTagsResponse = DeleteTagsResult | UnAuthorized;

export type DeleteTagsResult = {
  __typename?: "DeleteTagsResult";
  ok: Scalars["Boolean"];
};

export type Design = {
  __typename?: "Design";
  brand_color?: Maybe<Scalars["String"]>;
  primary_font?: Maybe<Scalars["String"]>;
  secondary_font?: Maybe<Scalars["String"]>;
};

export type Domain = {
  __typename?: "Domain";
  configured?: Maybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  /** @deprecated Use `configured` instead */
  mapped?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  ssl?: Maybe<Scalars["Boolean"]>;
  verification?: Maybe<Array<Maybe<DomainVerification>>>;
};

export type DomainError = LetterpadError & {
  __typename?: "DomainError";
  message: Scalars["String"];
};

export type DomainNotFound = LetterpadError & {
  __typename?: "DomainNotFound";
  message: Scalars["String"];
};

export type DomainResponse = Domain | DomainNotFound;

export type DomainVerification = {
  __typename?: "DomainVerification";
  domain: Scalars["String"];
  reason: Scalars["String"];
  type: Scalars["String"];
  value: Scalars["String"];
};

export type EditTaxResponse = {
  __typename?: "EditTaxResponse";
  ok: Scalars["Boolean"];
};

export type Email = {
  __typename?: "Email";
  body: Scalars["String"];
  subject: Scalars["String"];
  template_id: Scalars["String"];
};

export type EmailError = LetterpadError & {
  __typename?: "EmailError";
  message: Scalars["String"];
};

export type EmailResponse = Email | EmailError;

export type Error = {
  __typename?: "Error";
  message?: Maybe<Scalars["String"]>;
  path: Scalars["String"];
};

export type Exception = LetterpadError & {
  __typename?: "Exception";
  message: Scalars["String"];
};

export type Failed = LetterpadError & {
  __typename?: "Failed";
  message: Scalars["String"];
  type?: Maybe<Failed>;
};

export type Feed = {
  __typename?: "Feed";
  rows: Array<FeedNode>;
};

export type FeedError = {
  __typename?: "FeedError";
  message?: Maybe<Scalars["String"]>;
};

export type FeedNode = {
  __typename?: "FeedNode";
  author: Scalars["String"];
  categories: Array<Scalars["String"]>;
  description: Scalars["String"];
  guid: Scalars["String"];
  link: Scalars["String"];
  pubDate: Scalars["String"];
  title: Scalars["String"];
};

export type FeedResponse = Feed | FeedError;

export type FollowAuthor = {
  __typename?: "FollowAuthor";
  avatar?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  username: Scalars["String"];
};

export type FollowAuthorResponse = {
  __typename?: "FollowAuthorResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type Forbidden = LetterpadError & {
  __typename?: "Forbidden";
  message: Scalars["String"];
  type?: Maybe<Failed>;
};

export type ForgotPasswordResponse = {
  __typename?: "ForgotPasswordResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type Image = {
  __typename?: "Image";
  height?: Maybe<Scalars["Int"]>;
  src?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type InputAuthor = {
  avatar?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  company_name?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  first_post_published?: InputMaybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  occupation?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  profile_updated?: InputMaybe<Scalars["Boolean"]>;
  register_step?: InputMaybe<RegisterStep>;
  roleId?: InputMaybe<Scalars["Int"]>;
  settings_updated?: InputMaybe<Scalars["Boolean"]>;
  signature?: InputMaybe<Scalars["String"]>;
  social?: InputMaybe<InputSocial>;
  stripe_customer_id?: InputMaybe<Scalars["String"]>;
  stripe_subscription_id?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type InputCreateAuthor = {
  email: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  register_step?: InputMaybe<RegisterStep>;
  setting?: InputMaybe<SettingInputType>;
  token: Scalars["String"];
  username?: InputMaybe<Scalars["String"]>;
};

export type InputCreatePost = {
  cover_image?: InputMaybe<InputImage>;
  excerpt?: InputMaybe<Scalars["String"]>;
  featured?: InputMaybe<Scalars["Boolean"]>;
  html?: InputMaybe<Scalars["String"]>;
  page_data?: InputMaybe<Scalars["String"]>;
  page_type?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<PostStatusOptions>;
  sub_title?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>;
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<PostTypes>;
};

export type InputDesign = {
  brand_color?: InputMaybe<Scalars["String"]>;
  primary_font?: InputMaybe<Scalars["String"]>;
  secondary_font?: InputMaybe<Scalars["String"]>;
};

export type InputDomain = {
  mapped?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  ssl?: InputMaybe<Scalars["Boolean"]>;
};

export type InputImage = {
  height?: InputMaybe<Scalars["Int"]>;
  src: Scalars["String"];
  width?: InputMaybe<Scalars["Int"]>;
};

export type InputNavigation = {
  label: Scalars["String"];
  original_name: Scalars["String"];
  slug: Scalars["String"];
  type: NavigationType;
};

export type InputPostStats = {
  characters?: InputMaybe<Scalars["Int"]>;
  spaceless_characters?: InputMaybe<Scalars["Int"]>;
  words?: InputMaybe<Scalars["Int"]>;
};

export type InputPublishOptions = {
  sendMail?: InputMaybe<Scalars["Boolean"]>;
  testMail?: InputMaybe<Scalars["Boolean"]>;
};

export type InputSocial = {
  facebook?: InputMaybe<Scalars["String"]>;
  github?: InputMaybe<Scalars["String"]>;
  instagram?: InputMaybe<Scalars["String"]>;
  linkedin?: InputMaybe<Scalars["String"]>;
  twitter?: InputMaybe<Scalars["String"]>;
};

export type InputTags = {
  name: Scalars["String"];
  old_name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type InputUpdateMedia = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
};

export type InputUpdatePost = {
  cover_image?: InputMaybe<InputImage>;
  excerpt?: InputMaybe<Scalars["String"]>;
  featured?: InputMaybe<Scalars["Boolean"]>;
  html?: InputMaybe<Scalars["String"]>;
  html_draft?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  mail_status?: InputMaybe<MailStatus>;
  page_data?: InputMaybe<Scalars["String"]>;
  page_type?: InputMaybe<Scalars["String"]>;
  publishOptions?: InputMaybe<InputPublishOptions>;
  publishedAt?: InputMaybe<Scalars["Date"]>;
  scheduledAt?: InputMaybe<Scalars["Date"]>;
  slug?: InputMaybe<Scalars["String"]>;
  stats?: InputMaybe<InputPostStats>;
  status?: InputMaybe<PostStatusOptions>;
  sub_title?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<TagsInputType>>;
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<PostTypes>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
};

export type InputUpdateSubscriber = {
  secret_id?: InputMaybe<Scalars["String"]>;
  verified?: InputMaybe<Scalars["Boolean"]>;
};

export type InvalidArguments = LetterpadError & {
  __typename?: "InvalidArguments";
  message: Scalars["String"];
};

export type IsFollowingResponse = {
  __typename?: "IsFollowingResponse";
  following: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type IsPostLikedResponse = {
  __typename?: "IsPostLikedResponse";
  liked: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type LetterpadError = {
  message: Scalars["String"];
};

export type LetterpadPostFilters = {
  slug: Scalars["String"];
  username: Scalars["String"];
};

export type Like = {
  __typename?: "Like";
  avatar?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type LoginData = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginError = LetterpadError & {
  __typename?: "LoginError";
  message: Scalars["String"];
};

export type LoginResponse = Author | LoginError;

export enum MailStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Sent = "SENT",
}

export type Media = {
  __typename?: "Media";
  authorId?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["Date"];
  description?: Maybe<Scalars["String"]>;
  height: Scalars["Int"];
  id: Scalars["Int"];
  name: Scalars["String"];
  url: Scalars["String"];
  width: Scalars["Int"];
};

export type MediaDeleteResponse = MediaDeleteResult | UnAuthorized;

export type MediaDeleteResult = {
  __typename?: "MediaDeleteResult";
  ok: Scalars["Boolean"];
};

export type MediaFilters = {
  authorId?: InputMaybe<Scalars["Int"]>;
  cursor?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type MediaNode = {
  __typename?: "MediaNode";
  count: Scalars["Int"];
  rows: Array<Media>;
};

export type MediaResponse = MediaNode | UnAuthorized;

export type MediaUpdateResponse = MediaUpdateResult | UnAuthorized;

export type MediaUpdateResult = {
  __typename?: "MediaUpdateResult";
  ok: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  addDomain: AddDomainResponse;
  addSubscriber?: Maybe<SubscribersAddResult>;
  createAuthor?: Maybe<AuthorResponse>;
  createPost: CreatePostResponse;
  deleteAuthor?: Maybe<DeleteAuthorResponse>;
  deleteMedia?: Maybe<MediaDeleteResponse>;
  deleteTags: DeleteTagsResponse;
  followAuthor: FollowAuthorResponse;
  forgotPassword: ForgotPasswordResponse;
  likePost: ToggleLikePostResponse;
  login?: Maybe<LoginResponse>;
  removeDomain: RemoveDomainResponse;
  resetPassword: ForgotPasswordResponse;
  unFollowAuthor: FollowAuthorResponse;
  unLikePost: ToggleLikePostResponse;
  updateAuthor?: Maybe<AuthorResponse>;
  updateMedia?: Maybe<MediaUpdateResponse>;
  updateOptions?: Maybe<SettingResponse>;
  updatePost: UpdatePostResponse;
  updateSubscriber: SubscribersUpdateResult;
  updateTags: UpdateTagsResponse;
};

export type MutationAddDomainArgs = {
  domain?: InputMaybe<Scalars["String"]>;
};

export type MutationAddSubscriberArgs = {
  email: Scalars["String"];
};

export type MutationCreateAuthorArgs = {
  data: InputCreateAuthor;
};

export type MutationCreatePostArgs = {
  data?: InputMaybe<InputCreatePost>;
};

export type MutationDeleteMediaArgs = {
  ids: Array<Scalars["Int"]>;
};

export type MutationDeleteTagsArgs = {
  name: Scalars["String"];
};

export type MutationFollowAuthorArgs = {
  username: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLikePostArgs = {
  postId: Scalars["Int"];
};

export type MutationLoginArgs = {
  data?: InputMaybe<LoginData>;
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type MutationUnFollowAuthorArgs = {
  username: Scalars["String"];
};

export type MutationUnLikePostArgs = {
  postId: Scalars["Int"];
};

export type MutationUpdateAuthorArgs = {
  author: InputAuthor;
};

export type MutationUpdateMediaArgs = {
  data: InputUpdateMedia;
};

export type MutationUpdateOptionsArgs = {
  options: Array<SettingInputType>;
};

export type MutationUpdatePostArgs = {
  data?: InputMaybe<InputUpdatePost>;
};

export type MutationUpdateSubscriberArgs = {
  data: InputUpdateSubscriber;
};

export type MutationUpdateTagsArgs = {
  data?: InputMaybe<InputTags>;
};

export type Navigation = {
  __typename?: "Navigation";
  label: Scalars["String"];
  original_name: Scalars["String"];
  slug: Scalars["String"];
  type: NavigationType;
};

export enum NavigationType {
  Custom = "custom",
  Page = "page",
  Tag = "tag",
}

export type NotFound = LetterpadError & {
  __typename?: "NotFound";
  message: Scalars["String"];
};

export enum Permissions {
  ManageAllPosts = "MANAGE_ALL_POSTS",
  ManageOwnPosts = "MANAGE_OWN_POSTS",
  ManageSettings = "MANAGE_SETTINGS",
  ManageUsers = "MANAGE_USERS",
  ReadOnlyPosts = "READ_ONLY_POSTS",
}

export type Post = {
  __typename?: "Post";
  author?: Maybe<AuthorResponse>;
  cover_image: Image;
  createdAt: Scalars["Date"];
  excerpt?: Maybe<Scalars["String"]>;
  featured: Scalars["Boolean"];
  html?: Maybe<Scalars["String"]>;
  html_draft?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  likes?: Maybe<Array<Maybe<Like>>>;
  mail_status?: Maybe<MailStatus>;
  page_data?: Maybe<Scalars["String"]>;
  page_type?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["Date"]>;
  /** @deprecated Use stats.reading_time in Post */
  reading_time?: Maybe<Scalars["String"]>;
  scheduledAt?: Maybe<Scalars["Date"]>;
  slug?: Maybe<Scalars["String"]>;
  stats?: Maybe<PostStats>;
  status: PostStatusOptions;
  sub_title?: Maybe<Scalars["String"]>;
  tags?: Maybe<TagsResponse>;
  title: Scalars["String"];
  type: PostTypes;
  updatedAt: Scalars["Date"];
};

export type PostCountsByStatus = {
  __typename?: "PostCountsByStatus";
  drafts: Scalars["Int"];
  published: Scalars["Int"];
  trashed: Scalars["Int"];
};

export type PostError = LetterpadError & {
  __typename?: "PostError";
  message: Scalars["String"];
};

export type PostFilters = {
  featured?: InputMaybe<Scalars["Boolean"]>;
  id?: InputMaybe<Scalars["Int"]>;
  previewHash?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<PostStatusOptions>;
  type?: InputMaybe<PostTypes>;
};

export type PostResponse =
  | Exception
  | InvalidArguments
  | NotFound
  | Post
  | UnAuthorized;

export type PostStats = {
  __typename?: "PostStats";
  characters?: Maybe<Scalars["Int"]>;
  reading_time?: Maybe<Scalars["String"]>;
  spaceless_characters?: Maybe<Scalars["Int"]>;
  words?: Maybe<Scalars["Int"]>;
};

export enum PostStatusOptions {
  Draft = "draft",
  Published = "published",
  Trashed = "trashed",
}

export type PostTrashed = {
  __typename?: "PostTrashed";
  message: Scalars["String"];
};

export enum PostTypes {
  Page = "page",
  Post = "post",
}

export type PostsFilters = {
  author?: InputMaybe<Scalars["String"]>;
  cursor?: InputMaybe<Scalars["Int"]>;
  featured?: InputMaybe<Scalars["Boolean"]>;
  id?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  page_type?: InputMaybe<Scalars["String"]>;
  previewHash?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<SortBy>;
  status?: InputMaybe<Array<InputMaybe<PostStatusOptions>>>;
  tag?: InputMaybe<Scalars["String"]>;
  tagSlug?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<PostTypes>;
};

export type PostsNode = {
  __typename?: "PostsNode";
  count: Scalars["Int"];
  rows: Array<Post>;
};

export type PostsResponse = Exception | PostsNode | UnAuthorized;

export type Query = {
  __typename?: "Query";
  aboutStats: AboutStatsResponse;
  certs: Scalars["Boolean"];
  createSubscription: CreateSubscriptionResponse;
  domain: DomainResponse;
  email: EmailResponse;
  emails: Array<Maybe<Email>>;
  feed: FeedResponse;
  isFollowing: IsFollowingResponse;
  isPostLiked: IsPostLikedResponse;
  letterpadLatestPost: PostResponse;
  letterpadLatestPosts: PostsResponse;
  me?: Maybe<AuthorResponse>;
  media: MediaResponse;
  post: PostResponse;
  posts: PostsResponse;
  settings: SettingResponse;
  sitemap: SiteMapResponse;
  sitemaps: SiteMapResponse;
  stats?: Maybe<StatsResponse>;
  subscriber: SubscriberResponse;
  subscribers: SubscribersNode;
  tag: TagResponse;
  tags: TagsResponse;
  updateSubscription: UpdateSubscriptionResponse;
};

export type QueryAboutStatsArgs = {
  username: Scalars["String"];
};

export type QueryCreateSubscriptionArgs = {
  type?: InputMaybe<Scalars["String"]>;
};

export type QueryEmailArgs = {
  template_id?: InputMaybe<Scalars["String"]>;
};

export type QueryIsFollowingArgs = {
  username: Scalars["String"];
};

export type QueryIsPostLikedArgs = {
  postId: Scalars["Int"];
};

export type QueryLetterpadLatestPostArgs = {
  filters?: InputMaybe<LetterpadPostFilters>;
};

export type QueryMediaArgs = {
  filters?: InputMaybe<MediaFilters>;
};

export type QueryPostArgs = {
  filters?: InputMaybe<PostFilters>;
};

export type QueryPostsArgs = {
  filters?: InputMaybe<PostsFilters>;
};

export type QuerySubscriberArgs = {
  subscriber_id?: InputMaybe<Scalars["Int"]>;
};

export type QuerySubscribersArgs = {
  author_id?: InputMaybe<Scalars["Int"]>;
};

export type QueryTagArgs = {
  slug: Scalars["String"];
};

export type QueryTagsArgs = {
  filters?: InputMaybe<TagsFilters>;
};

export type QueryUpdateSubscriptionArgs = {
  type?: InputMaybe<Scalars["String"]>;
};

export enum RegisterStep {
  ProfileInfo = "ProfileInfo",
  Registered = "Registered",
  SiteInfo = "SiteInfo",
}

export type RemoveDomainResponse = {
  __typename?: "RemoveDomainResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type Response = {
  __typename?: "Response";
  errors?: Maybe<Array<Error>>;
  ok: Scalars["Boolean"];
  post?: Maybe<Post>;
};

export enum Role {
  Admin = "ADMIN",
  Author = "AUTHOR",
  Reader = "READER",
  Reviewer = "REVIEWER",
}

export type Setting = {
  __typename?: "Setting";
  banner?: Maybe<Image>;
  client_token: Scalars["String"];
  cloudinary_key?: Maybe<Scalars["String"]>;
  cloudinary_name?: Maybe<Scalars["String"]>;
  cloudinary_secret?: Maybe<Scalars["String"]>;
  css?: Maybe<Scalars["String"]>;
  design?: Maybe<Design>;
  display_author_info: Scalars["Boolean"];
  id: Scalars["Int"];
  intro_dismissed: Scalars["Boolean"];
  menu: Array<Navigation>;
  openai_key?: Maybe<Scalars["String"]>;
  scripts?: Maybe<Scalars["String"]>;
  show_about_page?: Maybe<Scalars["Boolean"]>;
  show_tags_page?: Maybe<Scalars["Boolean"]>;
  site_description?: Maybe<Scalars["String"]>;
  site_email: Scalars["String"];
  site_favicon?: Maybe<Image>;
  site_footer?: Maybe<Scalars["String"]>;
  site_logo?: Maybe<Image>;
  site_tagline?: Maybe<Scalars["String"]>;
  site_title: Scalars["String"];
  site_url: Scalars["String"];
  subscribe_embed?: Maybe<Scalars["String"]>;
  theme?: Maybe<Scalars["String"]>;
};

export type SettingError = LetterpadError & {
  __typename?: "SettingError";
  message: Scalars["String"];
};

export type SettingInputType = {
  banner?: InputMaybe<InputImage>;
  cloudinary_key?: InputMaybe<Scalars["String"]>;
  cloudinary_name?: InputMaybe<Scalars["String"]>;
  cloudinary_secret?: InputMaybe<Scalars["String"]>;
  css?: InputMaybe<Scalars["String"]>;
  design?: InputMaybe<InputDesign>;
  display_author_info?: InputMaybe<Scalars["Boolean"]>;
  intro_dismissed?: InputMaybe<Scalars["Boolean"]>;
  menu?: InputMaybe<Array<InputNavigation>>;
  openai_key?: InputMaybe<Scalars["String"]>;
  scripts?: InputMaybe<Scalars["String"]>;
  show_about_page?: InputMaybe<Scalars["Boolean"]>;
  show_tags_page?: InputMaybe<Scalars["Boolean"]>;
  site_description?: InputMaybe<Scalars["String"]>;
  site_email?: InputMaybe<Scalars["String"]>;
  site_favicon?: InputMaybe<InputImage>;
  site_footer?: InputMaybe<Scalars["String"]>;
  site_logo?: InputMaybe<InputImage>;
  site_tagline?: InputMaybe<Scalars["String"]>;
  site_title?: InputMaybe<Scalars["String"]>;
  site_url?: InputMaybe<Scalars["String"]>;
  subscribe_embed?: InputMaybe<Scalars["String"]>;
  theme?: InputMaybe<Scalars["String"]>;
};

export type SettingResponse = NotFound | Setting | UnAuthorized;

export type SiteMapError = {
  __typename?: "SiteMapError";
  message?: Maybe<Scalars["String"]>;
};

export type SiteMapList = {
  __typename?: "SiteMapList";
  rows: Array<SiteMapNode>;
};

export type SiteMapNode = {
  __typename?: "SiteMapNode";
  changefreq?: Maybe<Scalars["String"]>;
  lastmod?: Maybe<Scalars["String"]>;
  priority: Scalars["Int"];
  route: Scalars["String"];
};

export type SiteMapResponse = SiteMapError | SiteMapList;

export type Social = {
  __typename?: "Social";
  facebook?: Maybe<Scalars["String"]>;
  github?: Maybe<Scalars["String"]>;
  instagram?: Maybe<Scalars["String"]>;
  linkedin?: Maybe<Scalars["String"]>;
  twitter?: Maybe<Scalars["String"]>;
};

export enum SortBy {
  Asc = "asc",
  Desc = "desc",
}

export type Stats = {
  __typename?: "Stats";
  media: Scalars["Int"];
  pages: PostCountsByStatus;
  posts: PostCountsByStatus;
  tags: Scalars["Int"];
};

export type StatsError = LetterpadError & {
  __typename?: "StatsError";
  message: Scalars["String"];
};

export type StatsResponse = Stats | StatsError;

export type Subscriber = {
  __typename?: "Subscriber";
  author_id: Scalars["Int"];
  createdAt: Scalars["Date"];
  email: Scalars["String"];
  id: Scalars["Int"];
  verified: Scalars["Boolean"];
};

export type SubscriberError = {
  __typename?: "SubscriberError";
  message?: Maybe<Scalars["String"]>;
};

export type SubscriberResponse = Subscriber | SubscriberError;

export type SubscribersAddResult = {
  __typename?: "SubscribersAddResult";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type SubscribersNode = {
  __typename?: "SubscribersNode";
  count: Scalars["Int"];
  rows: Array<Subscriber>;
};

export type SubscribersUpdateResult = {
  __typename?: "SubscribersUpdateResult";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type Subscription = {
  __typename?: "Subscription";
  created_at: Scalars["String"];
  customer_id: Scalars["Int"];
  id: Scalars["Int"];
  plan_id: Scalars["Int"];
  status: Scalars["String"];
  subscription_id: Scalars["Int"];
  updated_at: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["String"];
  name: Scalars["String"];
  posts?: Maybe<PostsResponse>;
  slug: Scalars["String"];
  type: TagType;
};

export type TagResponse = Exception | Tag | UnAuthorized;

export type TagResultError = LetterpadError & {
  __typename?: "TagResultError";
  message: Scalars["String"];
};

export enum TagType {
  Category = "category",
  Tag = "tag",
}

export type TagsFilters = {
  active?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  suggest?: InputMaybe<Scalars["Boolean"]>;
};

export type TagsInputType = {
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type TagsNode = {
  __typename?: "TagsNode";
  rows: Array<Tag>;
};

export type TagsResponse = Exception | TagsNode | UnAuthorized;

export type ToggleLikePostResponse = {
  __typename?: "ToggleLikePostResponse";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type UnAuthorized = LetterpadError & {
  __typename?: "UnAuthorized";
  message: Scalars["String"];
};

export type Unexpected = LetterpadError & {
  __typename?: "Unexpected";
  message: Scalars["String"];
};

export type UpdateDomainResponse = {
  __typename?: "UpdateDomainResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type UpdatePostResponse = Post | PostError | PostTrashed;

export type UpdateSubscriptionResponse = {
  __typename?: "UpdateSubscriptionResponse";
  message?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type UpdateTagsResponse = EditTaxResponse | UnAuthorized;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename: "Author";
        name: string;
        bio?: string | null;
        occupation?: string | null;
        signature?: string | null;
        avatar?: string | null;
        company_name?: string | null;
        analytics_uuid?: string | null;
        username: string;
        createdAt?: string | null;
        followers?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        following?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        social?: {
          __typename?: "Social";
          twitter?: string | null;
          facebook?: string | null;
          github?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
        } | null;
      }
    | { __typename: "Exception"; message: string }
    | { __typename: "Failed"; message: string }
    | { __typename: "NotFound"; message: string }
    | { __typename: "UnAuthorized"; message: string }
    | null;
};

export type MeFragmentFragment = {
  __typename: "Author";
  name: string;
  bio?: string | null;
  occupation?: string | null;
  signature?: string | null;
  avatar?: string | null;
  company_name?: string | null;
  analytics_uuid?: string | null;
  username: string;
  createdAt?: string | null;
  followers?: Array<{
    __typename?: "FollowAuthor";
    name: string;
    avatar?: string | null;
    username: string;
  } | null> | null;
  following?: Array<{
    __typename?: "FollowAuthor";
    name: string;
    avatar?: string | null;
    username: string;
  } | null> | null;
  social?: {
    __typename?: "Social";
    twitter?: string | null;
    facebook?: string | null;
    github?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
};

export type FeedQueryVariables = Exact<{ [key: string]: never }>;

export type FeedQuery = {
  __typename?: "Query";
  feed:
    | {
        __typename: "Feed";
        rows: Array<{
          __typename?: "FeedNode";
          guid: string;
          title: string;
          link: string;
          description: string;
          pubDate: string;
          author: string;
          categories: Array<string>;
        }>;
      }
    | { __typename: "FeedError"; message?: string | null };
};

type FeedFragment_Feed_Fragment = {
  __typename: "Feed";
  rows: Array<{
    __typename?: "FeedNode";
    guid: string;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    author: string;
    categories: Array<string>;
  }>;
};

type FeedFragment_FeedError_Fragment = {
  __typename: "FeedError";
  message?: string | null;
};

export type FeedFragmentFragment =
  | FeedFragment_Feed_Fragment
  | FeedFragment_FeedError_Fragment;

export type MeAndSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type MeAndSettingsQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename: "Author";
        name: string;
        bio?: string | null;
        occupation?: string | null;
        signature?: string | null;
        avatar?: string | null;
        company_name?: string | null;
        analytics_uuid?: string | null;
        username: string;
        createdAt?: string | null;
        followers?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        following?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        social?: {
          __typename?: "Social";
          twitter?: string | null;
          facebook?: string | null;
          github?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
        } | null;
      }
    | { __typename: "Exception"; message: string }
    | { __typename: "Failed"; message: string }
    | { __typename: "NotFound"; message: string }
    | { __typename: "UnAuthorized"; message: string }
    | null;
  settings:
    | { __typename: "NotFound"; message: string }
    | {
        __typename: "Setting";
        site_title: string;
        site_tagline?: string | null;
        site_email: string;
        site_url: string;
        site_description?: string | null;
        theme?: string | null;
        scripts?: string | null;
        show_about_page?: boolean | null;
        show_tags_page?: boolean | null;
        display_author_info: boolean;
        css?: string | null;
        site_footer?: string | null;
        banner?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        design?: {
          __typename?: "Design";
          brand_color?: string | null;
          primary_font?: string | null;
          secondary_font?: string | null;
        } | null;
        menu: Array<{
          __typename?: "Navigation";
          label: string;
          type: NavigationType;
          original_name: string;
          slug: string;
        }>;
        site_logo?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        site_favicon?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }
    | { __typename: "UnAuthorized"; message: string };
};

export type PostQueryVariables = Exact<{
  filters?: InputMaybe<PostFilters>;
}>;

export type PostQuery = {
  __typename?: "Query";
  post:
    | { __typename: "Exception"; message: string }
    | { __typename: "InvalidArguments"; message: string }
    | { __typename: "NotFound"; message: string }
    | {
        __typename: "Post";
        id: number;
        slug?: string | null;
        title: string;
        sub_title?: string | null;
        reading_time?: string | null;
        page_type?: string | null;
        page_data?: string | null;
        html?: string | null;
        type: PostTypes;
        publishedAt?: any | null;
        updatedAt: any;
        excerpt?: string | null;
        stats?: {
          __typename?: "PostStats";
          words?: number | null;
          reading_time?: string | null;
          characters?: number | null;
          spaceless_characters?: number | null;
        } | null;
        likes?: Array<{
          __typename?: "Like";
          avatar?: string | null;
          username?: string | null;
        } | null> | null;
        tags?:
          | { __typename: "Exception"; message: string }
          | {
              __typename: "TagsNode";
              rows: Array<{ __typename?: "Tag"; name: string; slug: string }>;
            }
          | { __typename: "UnAuthorized"; message: string }
          | null;
        author?:
          | {
              __typename: "Author";
              id: number;
              name: string;
              avatar?: string | null;
              occupation?: string | null;
              bio?: string | null;
              signature?: string | null;
              username: string;
            }
          | { __typename: "Exception"; message: string }
          | { __typename: "Failed"; message: string }
          | { __typename: "NotFound"; message: string }
          | { __typename: "UnAuthorized"; message: string }
          | null;
        cover_image: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        };
      }
    | { __typename: "UnAuthorized"; message: string };
};

export type PageFragmentFragment = {
  __typename?: "Post";
  id: number;
  slug?: string | null;
  title: string;
  sub_title?: string | null;
  reading_time?: string | null;
  page_type?: string | null;
  page_data?: string | null;
  html?: string | null;
  type: PostTypes;
  publishedAt?: any | null;
  updatedAt: any;
  excerpt?: string | null;
  stats?: {
    __typename?: "PostStats";
    words?: number | null;
    reading_time?: string | null;
    characters?: number | null;
    spaceless_characters?: number | null;
  } | null;
  likes?: Array<{
    __typename?: "Like";
    avatar?: string | null;
    username?: string | null;
  } | null> | null;
  tags?:
    | { __typename: "Exception"; message: string }
    | {
        __typename: "TagsNode";
        rows: Array<{ __typename?: "Tag"; name: string; slug: string }>;
      }
    | { __typename: "UnAuthorized"; message: string }
    | null;
  author?:
    | {
        __typename: "Author";
        id: number;
        name: string;
        avatar?: string | null;
        occupation?: string | null;
        bio?: string | null;
        signature?: string | null;
        username: string;
      }
    | { __typename: "Exception"; message: string }
    | { __typename: "Failed"; message: string }
    | { __typename: "NotFound"; message: string }
    | { __typename: "UnAuthorized"; message: string }
    | null;
  cover_image: {
    __typename?: "Image";
    src?: string | null;
    width?: number | null;
    height?: number | null;
  };
};

export type PostPageQueryVariables = Exact<{
  filters?: InputMaybe<PostFilters>;
}>;

export type PostPageQuery = {
  __typename?: "Query";
  post:
    | { __typename: "Exception"; message: string }
    | { __typename: "InvalidArguments"; message: string }
    | { __typename: "NotFound"; message: string }
    | {
        __typename: "Post";
        id: number;
        slug?: string | null;
        title: string;
        sub_title?: string | null;
        reading_time?: string | null;
        page_type?: string | null;
        page_data?: string | null;
        html?: string | null;
        type: PostTypes;
        publishedAt?: any | null;
        updatedAt: any;
        excerpt?: string | null;
        stats?: {
          __typename?: "PostStats";
          words?: number | null;
          reading_time?: string | null;
          characters?: number | null;
          spaceless_characters?: number | null;
        } | null;
        likes?: Array<{
          __typename?: "Like";
          avatar?: string | null;
          username?: string | null;
        } | null> | null;
        tags?:
          | { __typename: "Exception"; message: string }
          | {
              __typename: "TagsNode";
              rows: Array<{ __typename?: "Tag"; name: string; slug: string }>;
            }
          | { __typename: "UnAuthorized"; message: string }
          | null;
        author?:
          | {
              __typename: "Author";
              id: number;
              name: string;
              avatar?: string | null;
              occupation?: string | null;
              bio?: string | null;
              signature?: string | null;
              username: string;
            }
          | { __typename: "Exception"; message: string }
          | { __typename: "Failed"; message: string }
          | { __typename: "NotFound"; message: string }
          | { __typename: "UnAuthorized"; message: string }
          | null;
        cover_image: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        };
      }
    | { __typename: "UnAuthorized"; message: string };
  me?:
    | {
        __typename: "Author";
        name: string;
        bio?: string | null;
        occupation?: string | null;
        signature?: string | null;
        avatar?: string | null;
        company_name?: string | null;
        analytics_uuid?: string | null;
        username: string;
        createdAt?: string | null;
        followers?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        following?: Array<{
          __typename?: "FollowAuthor";
          name: string;
          avatar?: string | null;
          username: string;
        } | null> | null;
        social?: {
          __typename?: "Social";
          twitter?: string | null;
          facebook?: string | null;
          github?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
        } | null;
      }
    | { __typename: "Exception"; message: string }
    | { __typename: "Failed"; message: string }
    | { __typename: "NotFound"; message: string }
    | { __typename: "UnAuthorized"; message: string }
    | null;
  settings:
    | { __typename: "NotFound"; message: string }
    | {
        __typename: "Setting";
        site_title: string;
        site_tagline?: string | null;
        site_email: string;
        site_url: string;
        site_description?: string | null;
        theme?: string | null;
        scripts?: string | null;
        show_about_page?: boolean | null;
        show_tags_page?: boolean | null;
        display_author_info: boolean;
        css?: string | null;
        site_footer?: string | null;
        banner?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        design?: {
          __typename?: "Design";
          brand_color?: string | null;
          primary_font?: string | null;
          secondary_font?: string | null;
        } | null;
        menu: Array<{
          __typename?: "Navigation";
          label: string;
          type: NavigationType;
          original_name: string;
          slug: string;
        }>;
        site_logo?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        site_favicon?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }
    | { __typename: "UnAuthorized"; message: string };
};

export type PostsQueryVariables = Exact<{
  tagSlug?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
}>;

export type PostsQuery = {
  __typename?: "Query";
  posts:
    | { __typename: "Exception"; message: string }
    | {
        __typename: "PostsNode";
        count: number;
        rows: Array<{
          __typename?: "Post";
          id: number;
          title: string;
          sub_title?: string | null;
          slug?: string | null;
          publishedAt?: any | null;
          reading_time?: string | null;
          excerpt?: string | null;
          likes?: Array<{
            __typename?: "Like";
            avatar?: string | null;
            username?: string | null;
          } | null> | null;
          cover_image: { __typename?: "Image"; src?: string | null };
          author?:
            | {
                __typename: "Author";
                name: string;
                avatar?: string | null;
                username: string;
              }
            | { __typename: "Exception"; message: string }
            | { __typename: "Failed"; message: string }
            | { __typename: "NotFound"; message: string }
            | { __typename: "UnAuthorized"; message: string }
            | null;
          stats?: {
            __typename?: "PostStats";
            words?: number | null;
            reading_time?: string | null;
            characters?: number | null;
            spaceless_characters?: number | null;
          } | null;
          tags?:
            | { __typename: "Exception"; message: string }
            | {
                __typename: "TagsNode";
                rows: Array<{ __typename?: "Tag"; name: string; slug: string }>;
              }
            | { __typename: "UnAuthorized"; message: string }
            | null;
        }>;
      }
    | { __typename: "UnAuthorized"; message: string };
};

export type PostsFragmentFragment = {
  __typename?: "PostsNode";
  count: number;
  rows: Array<{
    __typename?: "Post";
    id: number;
    title: string;
    sub_title?: string | null;
    slug?: string | null;
    publishedAt?: any | null;
    reading_time?: string | null;
    excerpt?: string | null;
    likes?: Array<{
      __typename?: "Like";
      avatar?: string | null;
      username?: string | null;
    } | null> | null;
    cover_image: { __typename?: "Image"; src?: string | null };
    author?:
      | {
          __typename: "Author";
          name: string;
          avatar?: string | null;
          username: string;
        }
      | { __typename: "Exception"; message: string }
      | { __typename: "Failed"; message: string }
      | { __typename: "NotFound"; message: string }
      | { __typename: "UnAuthorized"; message: string }
      | null;
    stats?: {
      __typename?: "PostStats";
      words?: number | null;
      reading_time?: string | null;
      characters?: number | null;
      spaceless_characters?: number | null;
    } | null;
    tags?:
      | { __typename: "Exception"; message: string }
      | {
          __typename: "TagsNode";
          rows: Array<{ __typename?: "Tag"; name: string; slug: string }>;
        }
      | { __typename: "UnAuthorized"; message: string }
      | null;
  }>;
};

export type SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsQuery = {
  __typename?: "Query";
  settings:
    | { __typename: "NotFound"; message: string }
    | {
        __typename: "Setting";
        site_title: string;
        site_tagline?: string | null;
        site_email: string;
        site_url: string;
        site_description?: string | null;
        theme?: string | null;
        scripts?: string | null;
        show_about_page?: boolean | null;
        show_tags_page?: boolean | null;
        display_author_info: boolean;
        css?: string | null;
        site_footer?: string | null;
        banner?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        design?: {
          __typename?: "Design";
          brand_color?: string | null;
          primary_font?: string | null;
          secondary_font?: string | null;
        } | null;
        menu: Array<{
          __typename?: "Navigation";
          label: string;
          type: NavigationType;
          original_name: string;
          slug: string;
        }>;
        site_logo?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
        site_favicon?: {
          __typename?: "Image";
          src?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }
    | { __typename: "UnAuthorized"; message: string };
};

export type SettingsFragmentFragment = {
  __typename?: "Setting";
  site_title: string;
  site_tagline?: string | null;
  site_email: string;
  site_url: string;
  site_description?: string | null;
  theme?: string | null;
  scripts?: string | null;
  show_about_page?: boolean | null;
  show_tags_page?: boolean | null;
  display_author_info: boolean;
  css?: string | null;
  site_footer?: string | null;
  banner?: {
    __typename?: "Image";
    src?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  design?: {
    __typename?: "Design";
    brand_color?: string | null;
    primary_font?: string | null;
    secondary_font?: string | null;
  } | null;
  menu: Array<{
    __typename?: "Navigation";
    label: string;
    type: NavigationType;
    original_name: string;
    slug: string;
  }>;
  site_logo?: {
    __typename?: "Image";
    src?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  site_favicon?: {
    __typename?: "Image";
    src?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

export type SitemapQueryVariables = Exact<{ [key: string]: never }>;

export type SitemapQuery = {
  __typename?: "Query";
  sitemap:
    | { __typename: "SiteMapError"; message?: string | null }
    | {
        __typename: "SiteMapList";
        rows: Array<{
          __typename?: "SiteMapNode";
          route: string;
          priority: number;
          lastmod?: string | null;
        }>;
      };
};

type SitemapFragment_SiteMapError_Fragment = {
  __typename: "SiteMapError";
  message?: string | null;
};

type SitemapFragment_SiteMapList_Fragment = {
  __typename: "SiteMapList";
  rows: Array<{
    __typename?: "SiteMapNode";
    route: string;
    priority: number;
    lastmod?: string | null;
  }>;
};

export type SitemapFragmentFragment =
  | SitemapFragment_SiteMapError_Fragment
  | SitemapFragment_SiteMapList_Fragment;

export type TagsQueryVariables = Exact<{ [key: string]: never }>;

export type TagsQuery = {
  __typename?: "Query";
  tags:
    | { __typename: "Exception"; message: string }
    | {
        __typename: "TagsNode";
        rows: Array<{
          __typename?: "Tag";
          name: string;
          slug: string;
          type: TagType;
          id: string;
          posts?:
            | { __typename: "Exception" }
            | {
                __typename: "PostsNode";
                count: number;
                rows: Array<{
                  __typename?: "Post";
                  id: number;
                  title: string;
                  slug?: string | null;
                  excerpt?: string | null;
                  publishedAt?: any | null;
                  reading_time?: string | null;
                  cover_image: { __typename?: "Image"; src?: string | null };
                  author?:
                    | {
                        __typename: "Author";
                        id: number;
                        name: string;
                        avatar?: string | null;
                        occupation?: string | null;
                        bio?: string | null;
                      }
                    | { __typename: "Exception"; message: string }
                    | { __typename: "Failed"; message: string }
                    | { __typename: "NotFound"; message: string }
                    | { __typename: "UnAuthorized"; message: string }
                    | null;
                }>;
              }
            | { __typename: "UnAuthorized" }
            | null;
        }>;
      }
    | { __typename: "UnAuthorized"; message: string };
};

export const MeFragmentFragmentDoc = `
    fragment meFragment on Author {
  ... on Author {
    __typename
    name
    bio
    occupation
    signature
    avatar
    company_name
    analytics_uuid
    username
    followers {
      name
      avatar
      username
    }
    following {
      name
      avatar
      username
    }
    createdAt
    social {
      twitter
      facebook
      github
      instagram
      linkedin
    }
  }
}
    `;
export const FeedFragmentFragmentDoc = `
    fragment feedFragment on FeedResponse {
  ... on Feed {
    rows {
      guid
      title
      link
      description
      pubDate
      author
      categories
    }
  }
  ... on FeedError {
    message
  }
  __typename
}
    `;
export const PageFragmentFragmentDoc = `
    fragment pageFragment on Post {
  id
  slug
  title
  sub_title
  reading_time
  stats {
    words
    reading_time
    characters
    spaceless_characters
  }
  page_type
  page_data
  html
  type
  publishedAt
  updatedAt
  excerpt
  likes {
    avatar
    username
  }
  tags {
    __typename
    ... on LetterpadError {
      message
    }
    ... on TagsNode {
      rows {
        name
        slug
      }
    }
  }
  author {
    __typename
    ... on LetterpadError {
      message
    }
    ... on Author {
      id
      name
      avatar
      occupation
      bio
      signature
      username
    }
  }
  cover_image {
    src
    width
    height
  }
}
    `;
export const PostsFragmentFragmentDoc = `
    fragment postsFragment on PostsNode {
  count
  rows {
    id
    title
    sub_title
    slug
    likes {
      avatar
      username
    }
    cover_image {
      src
    }
    author {
      __typename
      ... on LetterpadError {
        message
      }
      ... on Author {
        name
        avatar
        username
        __typename
      }
    }
    publishedAt
    reading_time
    stats {
      words
      reading_time
      characters
      spaceless_characters
    }
    excerpt
    tags {
      __typename
      ... on LetterpadError {
        message
      }
      ... on TagsNode {
        rows {
          name
          slug
        }
      }
    }
  }
}
    `;
export const SettingsFragmentFragmentDoc = `
    fragment settingsFragment on Setting {
  banner {
    src
    width
    height
  }
  site_title
  site_tagline
  site_email
  site_url
  site_description
  theme
  scripts
  show_about_page
  show_tags_page
  display_author_info
  design {
    brand_color
    primary_font
    secondary_font
  }
  menu {
    label
    type
    original_name
    slug
  }
  css
  site_logo {
    src
    width
    height
  }
  site_favicon {
    src
    width
    height
  }
  site_footer
}
    `;
export const SitemapFragmentFragmentDoc = `
    fragment sitemapFragment on SiteMapResponse {
  ... on SiteMapList {
    rows {
      route
      priority
      lastmod
    }
  }
  ... on SiteMapError {
    message
  }
  __typename
}
    `;
export const MeDocument = `
    query me {
  me {
    __typename
    ...meFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${MeFragmentFragmentDoc}`;
export const FeedDocument = `
    query feed {
  feed {
    __typename
    ...feedFragment
  }
}
    ${FeedFragmentFragmentDoc}`;
export const MeAndSettingsDocument = `
    query meAndSettings {
  me {
    __typename
    ...meFragment
    ... on LetterpadError {
      message
    }
  }
  settings {
    __typename
    ...settingsFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${MeFragmentFragmentDoc}
${SettingsFragmentFragmentDoc}`;
export const PostDocument = `
    query post($filters: PostFilters) {
  post(filters: $filters) {
    __typename
    ...pageFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${PageFragmentFragmentDoc}`;
export const PostPageDocument = `
    query postPage($filters: PostFilters) {
  post(filters: $filters) {
    __typename
    ...pageFragment
    ... on LetterpadError {
      message
    }
  }
  me {
    __typename
    ...meFragment
    ... on LetterpadError {
      message
    }
  }
  settings {
    __typename
    ...settingsFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${PageFragmentFragmentDoc}
${MeFragmentFragmentDoc}
${SettingsFragmentFragmentDoc}`;
export const PostsDocument = `
    query posts($tagSlug: String, $search: String) {
  posts(filters: {tagSlug: $tagSlug, search: $search}) {
    __typename
    ...postsFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${PostsFragmentFragmentDoc}`;
export const SettingsDocument = `
    query settings {
  settings {
    __typename
    ...settingsFragment
    ... on LetterpadError {
      message
    }
  }
}
    ${SettingsFragmentFragmentDoc}`;
export const SitemapDocument = `
    query sitemap {
  sitemap {
    ...sitemapFragment
  }
}
    ${SitemapFragmentFragmentDoc}`;
export const TagsDocument = `
    query tags {
  tags {
    __typename
    ... on LetterpadError {
      message
    }
    ... on TagsNode {
      rows {
        name
        slug
        type
        id
        posts {
          __typename
          ... on PostsNode {
            count
            rows {
              id
              title
              slug
              excerpt
              publishedAt
              reading_time
              cover_image {
                src
              }
              author {
                __typename
                ... on LetterpadError {
                  message
                }
                ... on Author {
                  id
                  name
                  avatar
                  occupation
                  bio
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(
  doc: string,
  vars?: V,
  options?: C,
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    me(variables?: MeQueryVariables, options?: C): Promise<MeQuery> {
      return requester<MeQuery, MeQueryVariables>(
        MeDocument,
        variables,
        options,
      ) as Promise<MeQuery>;
    },
    feed(variables?: FeedQueryVariables, options?: C): Promise<FeedQuery> {
      return requester<FeedQuery, FeedQueryVariables>(
        FeedDocument,
        variables,
        options,
      ) as Promise<FeedQuery>;
    },
    meAndSettings(
      variables?: MeAndSettingsQueryVariables,
      options?: C,
    ): Promise<MeAndSettingsQuery> {
      return requester<MeAndSettingsQuery, MeAndSettingsQueryVariables>(
        MeAndSettingsDocument,
        variables,
        options,
      ) as Promise<MeAndSettingsQuery>;
    },
    post(variables?: PostQueryVariables, options?: C): Promise<PostQuery> {
      return requester<PostQuery, PostQueryVariables>(
        PostDocument,
        variables,
        options,
      ) as Promise<PostQuery>;
    },
    postPage(
      variables?: PostPageQueryVariables,
      options?: C,
    ): Promise<PostPageQuery> {
      return requester<PostPageQuery, PostPageQueryVariables>(
        PostPageDocument,
        variables,
        options,
      ) as Promise<PostPageQuery>;
    },
    posts(variables?: PostsQueryVariables, options?: C): Promise<PostsQuery> {
      return requester<PostsQuery, PostsQueryVariables>(
        PostsDocument,
        variables,
        options,
      ) as Promise<PostsQuery>;
    },
    settings(
      variables?: SettingsQueryVariables,
      options?: C,
    ): Promise<SettingsQuery> {
      return requester<SettingsQuery, SettingsQueryVariables>(
        SettingsDocument,
        variables,
        options,
      ) as Promise<SettingsQuery>;
    },
    sitemap(
      variables?: SitemapQueryVariables,
      options?: C,
    ): Promise<SitemapQuery> {
      return requester<SitemapQuery, SitemapQueryVariables>(
        SitemapDocument,
        variables,
        options,
      ) as Promise<SitemapQuery>;
    },
    tags(variables?: TagsQueryVariables, options?: C): Promise<TagsQuery> {
      return requester<TagsQuery, TagsQueryVariables>(
        TagsDocument,
        variables,
        options,
      ) as Promise<TagsQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
