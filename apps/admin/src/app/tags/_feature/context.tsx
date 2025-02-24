import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Input, Message, Modal } from "ui";

import { useDeleteTags, useGetTags, useUpdateTags } from "./api.client";
import { getHeaders } from "./components/headers";
import { TagRow, TagsContextType } from "./types";
import { useGetPosts, useGetStats } from "../../posts/_feature/api.client";

export const TagsContext = createContext<Partial<TagsContextType<any, any>>>({
  loading: true,
  tags: [],
  updateTags: () => null,
  deleteTag: () => null,
  addTag: () => null,
  saveTag: () => null,
  headers: [],
});

export const TagsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const {
    data = [],
    fetching: loading,
    refetch: refetchTags,
  } = useGetTags({ active: true });
  const [tags, setTags] = useState<TagRow[]>([]);
  const [editTagId, setEditTagId] = useState<React.Key | null>(null);
  const postsQuery = useGetPosts({}, { skip: true });
  const statsQuery = useGetStats({}, { skip: true });

  const { updateTags, fetching: saving } = useUpdateTags();
  const { deleteTags, fetching: deleting } = useDeleteTags();

  const computedTags = useMemo(() => data ?? [], [data]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) {
      setTags(
        computedTags.map((item) => ({
          ...item,
          key: item.name,
          posts: item.posts?.__typename === "PostsNode" ? item.posts.count : 0,
        }))
      );
    }
  }, [computedTags, loading]);

  const deleteTag = useCallback(
    async (key: React.Key) => {
      const tagToDelete = [...tags].filter((item) => item.key === key);
      if (tagToDelete.length > 0) {
        Message().loading({ content: "Saving...", duration: 3 });
        await deleteTags({ name: tagToDelete[0].name });
        setTags(tags.filter((item) => item.key !== key));
        Message().success({ content: "Tag Deleted", duration: 2 });
        postsQuery.refetch();
        statsQuery.refetch();
      }
    },
    [deleteTags, postsQuery, statsQuery, tags]
  );

  const editTag = useCallback(async (key: React.Key) => {
    setEditTagId(key);
  }, []);

  const saveTag = useCallback(
    async (row: TagRow) => {
      if (row.name.length === 0) {
        return Message().error({ content: "Tag name cannot be empty!" });
      }
      const isDuplicate = tags.filter((item) => item.name === row.name).pop();
      if (isDuplicate) {
        return Message().error({ content: "Tag name already exists!" });
      }
      setEditTagId(null);
      let old_name = "";
      const newData = tags.map((item) => {
        if (item.key === row.key) {
          old_name = item.name;
          return row;
        }
        return item;
      });

      const { name, slug } = row;
      Message().loading({ content: "Saving...", duration: 3 });
      await updateTags({
        data: { name, slug, old_name },
      });
      Message().success({ content: "Saved", duration: 2 });
      postsQuery.refetch();
      setTags(newData);
    },
    [tags, updateTags, postsQuery]
  );

  const addTag = useCallback(() => {
    const newData: TagRow = {
      key: tags.length + 2,
      name: `new-tag-${tags.length}`,
      posts: 0,
      slug: `new-tag-${tags.length}`,
    };
    setTags([...tags, newData]);
  }, [tags]);

  const context: TagsContextType<typeof updateTags, typeof deleteTag> = useMemo(
    () => ({
      loading,
      tags,
      deleteTag,
      addTag,
      updateTags,
      saveTag,
      headers: getHeaders({ tags, deleteTag, editTag }),
    }),
    [addTag, deleteTag, editTag, loading, saveTag, tags, updateTags]
  );

  const onSave = () => {
    if (tagToBeEdited) {
      const slug =
        inputRef.current?.value.replace(/\s+/g, "-").toLowerCase() ?? "";
      saveTag({ ...tagToBeEdited, name: slug, id: slug, slug });
    }
  };

  const tagToBeEdited = tags.filter((item) => item.key === editTagId).pop();
  return (
    <TagsContext.Provider value={context}>
      {children}
      <Modal
        toggle={() => setEditTagId(null)}
        show={!!editTagId}
        header={`Editing tag: ${tagToBeEdited?.id}`}
        footer={[
          <Button
            key="close"
            variant="ghost"
            onClick={() => setEditTagId(null)}
            size="normal"
          >
            Cancel
          </Button>,
          <Button key="save" variant="primary" onClick={onSave} size="normal">
            Save
          </Button>,
        ]}
      >
        <Input
          label="Rename Tag"
          defaultValue={tagToBeEdited?.id}
          ref={inputRef}
          onEnter={onSave}
        />
      </Modal>
    </TagsContext.Provider>
  );
};

export const useTagsContext = () => useContext(TagsContext);
