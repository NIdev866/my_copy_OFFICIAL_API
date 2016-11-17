import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Subject , Observable} from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';


declare var firebase : any;

@Injectable()
export class AuthService {

	constructor(private http: Http, private cookie: CookieService){}


	/*
		CREATE PASSWORD, FROM EMAIL LINK ACCESS
	*/
	add_password(user){
		const body = JSON.stringify(user);
		console.log('FROM SERVICE: '+ body);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.put('http://localhost:3000/jobseeker/addlogin-credentials', body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error.json()));
	}
	/*
		ONLY FOR JOBSEEKER, FROM EMAIL LINK LOGIN PAGE, FIRST TIME LOGIN
	*/
	worker_login(id, user){
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.put('http://localhost:3000/jobseeker/login/' + id, body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error.json()));
	}

	/*
		GENERAL/MAIN/ROOT LOGIN
	*/
	login(login_credentials){
		const body = JSON.stringify(login_credentials);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/jobseeker/login', body, {headers: headers})
					.map(response => response.json())
					.catch(error => Observable.throw(error));
	}
	/*
		CHECK IF USER IS AUTHENTICATED , IF NOT, SHOW LOGIN
	*/
	authCheck(token){
		const body = JSON.stringify(token);
		
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/jobseeker/authcheck', body, {headers: headers})
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


		//FIREBASE
		/*const subject = new Subject<boolean>();
		firebase.onAuthStateChanged(function(user){
			if(user){

				subject.next(true);
				
			}else{
				subject.next(false);
				console.log('USER IS FALSE');
			}
		});
		return subject.asObservable();*/
		
	}


	/*
		LOGOUT
	*/
	logout(){
		this.cookie.removeAll();
		localStorage.clear();
	}



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