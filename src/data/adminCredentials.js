export const adminCredentials = {
  superAdmin: {
    email: 'admin@vivstock.com',
    password: 'admin123',
    role: 'super_admin',
    permissions: ['all']
  },
  admins: [
    {
      email: 'support@vivstock.com',
      password: 'support123',
      role: 'support_admin',
      permissions: ['view_users', 'process_kyc']
    }
  ]
};