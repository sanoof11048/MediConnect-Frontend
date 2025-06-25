export const Roles = {
  Admin: 'Admin',
  Relative: 'Relative',
  HomeNurse: 'HomeNurse',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
