import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Subject , Observable} from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';


declare var firebase : any;

@Injectable()
export class AdminAuthService {

	constructor(private http: Http, private cookie: CookieService){}


	/*
		CREATE ADMIN
	*/
	create_admin(admin_data){
		const body = JSON.stringify(admin_data);
		
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/login/add_admin', body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error.json()));
	}

	login(login_credentials){
		const body = JSON.stringify(login_credentials);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/login/admin_login', body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error));
	}
	authCheck(token){
		const body = JSON.stringify(token);
		
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/login/authcheck', body, {headers: headers})
					.map(response => response)
					.catch(error => Observable.throw(error));
	}

	isAuthenticated(): Observable<boolean>{
		
		const subject = new Subject<boolean>();
		const browsertoken = {
			token: this.cookie.get('hhHddsDRTgCEES2334D444D')
		}

		if(browsertoken){
			this.authCheck(browsertoken).subscribe(
					response=>{
						console.log('IS LOGGED IN: ' + response.status);
						if(response.status === 200){
							subject.next(true);

						}else if(response.status === 401){
							subject.next(false);
							alert('WRONG TOKEN! NO SUCH A WORKER_ID IN DB');
						}else{
							subject.next(false);
						}
					}, 
					err=>{throw err}
				)
		}else{
			subject.next(false);
		}

		return subject.asObservable();	
	}


	/*
		LOGOUT
	*/
	logout(){
		this.cookie.removeAll();
		localStorage.clear();
	}











	/*
		ONLY FOR JOBSEEKER, FROM EMAIL LINK LOGIN PAGE, FIRST TIME LOGIN
	*/
	worker_login(id, user){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.put('http://localhost:3000/api/login/' + id, body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error.json()));
	}

	/*
		GENERAL/MAIN/ROOT LOGIN
	*/
	
	/*
		CHECK IF USER IS AUTHENTICATED , IF NOT, SHOW LOGIN
	*/
	



	//FIREBASE AUTH
	user_logout(){
		localStorage.clear();

	}

	isUserLoggedIn(){
		return localStorage.getItem('auth_token') !== null;
	}





	//FIREBASE AUTH
	signupUser(user: User){
		///console.log('SIGNED UP');
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(error);
		  // ...
		});
	}

	signinUser(user: User){
		firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(error);

		  
		  // ...
		});
		
		
	}
	

	/*logout(){
		firebase.auth().signOut();
	}*/



}