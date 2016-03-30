server 'www.rongduan-zhu.com',
  user: ENV['me_user'],
  roles: %w{app},
  ssh_options: {
    keys: [ENV['me_key']]
  }
