import { api } from "./api";

export interface LeagueMember {
  user: {
    _id: string;
    username: string;
    name: string;
    leagueScore: number;
    avatar?: string;
  };
  score: number;
  joinedAt: Date;
}

export interface League {
  _id: string;
  name: string;
  members: LeagueMember[];
  icon: string;
  resetDate: Date;
  level: number;
}

const endpoints = (builder: any) => ({
  getLeagueById: builder.query<League, string>({
    query: (id) => ({
      url: `leagues/${id}`,
      method: "GET",
    }),
    providesTags: ["League"],
  }),
  
  createLeague: builder.mutation<League, Partial<League>>({
    query: (body) => ({
      url: "leagues/create",
      method: "POST",
      body,
    }),
    invalidatesTags: ["League"],
  }),
  
  addMemberToLeague: builder.mutation<League, { leagueId: string; userId: string; score?: number }>({
    query: ({ leagueId, ...body }) => ({
      url: `leagues/${leagueId}/member`,
      method: "POST",
      body,
    }),
    invalidatesTags: ["League"],
  }),
});

const leagueApi = api.injectEndpoints({ endpoints });

export default leagueApi;

export const {
  useGetLeagueByIdQuery,
  useCreateLeagueMutation,
  useAddMemberToLeagueMutation,
} = leagueApi;