How to run:
	install Nodejs:
		curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
		sudo apt install nodejs
		node --version

	clone the project from github:
		git clone yourproject.git

	install dependencies:
		cd backend/
		npm install

	install PM2: to watch changes and keep running on reboot
		sudo npm i pm2 -g
		cd api/
		pm2 start index.js --watch
		pm2 startup

	install Nginx: modify to display api on http, test config and restart service
		sudo apt install nginx
		sudo vi /etc/nginx/13/sites-available/default
			within this file modify server block to match the following:
    	
			server_name _;

			location / {
			        proxy_pass http://localhost:3001;
			        proxy_http_version 1.1;
			        proxy_set_header Upgrade $http_upgrade;
			        proxy_set_header Connection 'upgrade';
			        proxy_set_header Host $host;
			        proxy_cache_bypass $http_upgrade;
			}			

		sudo nginx -t
		sudo service nginx restart

	install PostgreSQL:
		sudo apt-get install postgresql

		create database:
			psql -U postgres -d postgres -c 'CREATE DATABASE countability'

		create tables:
			psql -U postgres -d countability -a -f ./backend/database/setup_tables.sql

		seed test data:
			psql -U postgres -d countability -a -f ./backend/database/seed_tables.sql

		drop tables:
			psql -U postgres -d countability -a -f ./backend/database/drop_tables.sql
