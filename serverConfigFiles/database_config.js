var database_config = {

		dev: {
			host: 'localhost',
			user: 'root',
			password: 'kamikaze13',
			database: 'resume_pro'
		},
		prod: {
			host: 'localhost',
			user: 'root',
			password: 'kamikaze13',
			database: 'resume_pro'
		},

		//FOR USE WITH 'promise-mysql'
		dev_pool:{
		  host: 'localhost',
		  user: 'root',
		  password: '01nikodem10',//was kamikaze13
		  database: 'resume_pro',
		  connectionLimit: 10
		},
		prod_pool:{
			host: 'localhost',
			user: 'root',
			password: 'kamikaze13',
			database: 'resume_pro',
			connectionLimit: 10
		}
};

module.exports = database_config;
