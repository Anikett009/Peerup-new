export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search Peers",
  },
  {
    imgURL: "/assets/edit.svg",
    route: "/create-thread",
    label: "Real-Time Editing",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/todo-list",
    label: "To-Do List",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL:"/assets/docs.svg",
    route: "/doc-upload",
    label: "Document Vault",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Notes", icon: "/assets/reply.svg" },
  //{ value: "replies", label: "Replies", icon: "/assets/members.svg" },
  //{ value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];


export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
