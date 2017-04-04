import {observable, computed, action} from "mobx";
import { observer } from 'mobx-react';

export class dailyHeadlinesListStore {
  @observable dailyHeadlinesList;
  constructor(dailyHeadlinesList) {
   this.dailyHeadlinesList = dailyHeadlinesList;
  }
  @action getdailyHLData() {
  	fetch('https://apis-fd.zaih.com/v1/topline?type=selected&offset=0&limit=20',//http://fd.zaih.com/topline_api/v1/headlines/digest
  	 {
  	  method: 'get'
  	 })
  	  .then((res) => {
  	     return res.json();
  	   })
  	  .then(
  	  	action('createRandomContact-callback', (response) => {
  	      if (response) {
  	        this.dailyHeadlinesList = response;
  	      }
  	    })
  	  )
  	  .catch((error)=>{
  	     console.log('error', error);
  	  });
  }
}

export function isContact(object) {
	return object instanceof Contact;
}	
