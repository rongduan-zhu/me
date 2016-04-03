# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'me'
set :repo_url, 'git@github.com:rongduan-zhu/me.git'

set :pty, true

dc = ['docker-compose', '-f', 'docker-compose.yml', '-f', 'docker-compose.prod.yml']

def execute_sudo *args
  execute :sudo, '-E', *args
end

namespace :deploy do
  desc 'Normal code update'
  task :code do
    on roles(:app) do
      within('/var/me') do
        execute_sudo :git, :pull
        execute_sudo *dc, :restart
      end
    end
  end

  desc 'Image update'
  task :image do
    on roles(:app) do
      within('/var/me') do
        execute_sudo :git, :pull
        execute_sudo './bin/bootstrap'
        execute_sudo *dc, :up, '-d'
      end
    end
  end

  desc 'Start container'
  task :up do
    on roles(:app) do
      within('/var/me') do
        execute_sudo *dc, :up, '-d'
      end
    end
  end
end
