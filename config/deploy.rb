# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'me'
set :repo_url, 'git@github.com:rongduan-zhu/me.git'

set :pty, true

dc = ['docker-compose', '-f', 'docker-compose.yml', '-f', 'docker-compose.prod.yml']

namespace :deploy do
  desc 'Normal code update'
  task :code do
    on roles(:app) do
      within('/var/me') do
        execute :sudo, :git, :pull
        execute :sudo, *dc, :restart
      end
    end
  end
end
