/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  infoduca: {
    // Dependent systems
    depends: ["postgres"],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby:2.3.1"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:migrate",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: ["bundle", "exec", "rackup", "config.ru", "--pid", "/tmp/ruby.pid", "--port", "$HTTP_PORT", "--host", "0.0.0.0"],
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/bundler': persistent("./bundler"),
      '/azk/#{manifest.dir}/tmp': persistent("./tmp"),
      '/azk/#{manifest.dir}/log': path("./log"),
      '/azk/#{manifest.dir}/.bundle': path("./.bundle"),
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp",
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      RUBY_ENV: "development",
      BUNDLE_APP_CONFIG: "/azk/bundler",
    },
  },
  postgres: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/postgres:9.4"},
    shell: "/bin/bash",
    wait: 150,
    mounts: {
      '/var/lib/postgresql/data': persistent("postgres-data"),
      '/var/log/postgresql': persistent("postgres-log"),
    },
    ports: {
      // exports global variables
      data: "5432/tcp",
    },
    envs: {
      // set instances variables
      POSTGRES_USER: "azk",
      POSTGRES_PASS: "azk",
      POSTGRES_DB: "azk",
    },
    export_envs: {
      // exports variables for dependent systems
      DATABASE_URL: "postgres://#{envs.POSTGRES_USER}:#{envs.POSTGRES_PASS}@#{net.host}:#{net.port.data}/#{envs.POSTGRES_DATABASE}",
    },
  },
});
