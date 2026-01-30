import baseApi from "../../../api/baseApi";

const ChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/chats",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getChats: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/chats?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),

    getChatsRoom: builder.query({
      query: ({ token, senderId, receiverId }) => {
        return {
          url: `/chats/chatroom/${senderId}/${receiverId}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleChat: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/chats/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteChat: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/chats/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editChat: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/chats/${id}`,
          method: "PATCH",
          headers: {
            authorization: token,
          },
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useDeleteChatMutation,
  useEditChatMutation,
  useGetChatsQuery,
  useGetSingleChatQuery,
  useGetChatsRoomQuery,
} = ChatApi;
