import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as AppConfig from '../../app/app.config';

/**
 * Generated class for the PhotosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
	images: Array<string>;  
	grid: Array<Array<string>>; //array of arrays

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	let imgurl = AppConfig.config.imgUrl+'myphotos/';	
  	this.grid = [
	  	[
	  		imgurl+'1.jpg', 	 		
	  		imgurl+'2.jpg', 	 		
	  	],
	  	[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	],
	  	[
	  		imgurl+'1.jpg', 	 		
	  		imgurl+'2.jpg', 	 		
	  	],
	  	[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	],
	  	[
	  		imgurl+'1.jpg', 	 		
	  		imgurl+'2.jpg', 	 		
	  	],
	  	[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	]
  	];
  }

  ionViewDidLoad() {
  	console.log(this.images);
    console.log('ionViewDidLoad PhotosPage');
  }

ionViewLoaded() {
  let rowNum = 0; //counter to iterate over the rows in the grid

  for (let i = 0; i < this.images.length; i+=2) { //iterate images
  	console.log("Image");
    this.grid[rowNum] = Array(2); //declare two elements per row

    if (this.images[i]) { //check file URI exists
      this.grid[rowNum][0] = this.images[i] //insert image
    }

    if (this.images[i+1]) { //repeat for the second image
      this.grid[rowNum][1] = this.images[i+1]
    }

    rowNum++; //go on to the next row
  }

  }

 doInfinite(infiniteScroll) {
    console.log('Begin async operation');
	let imgurl = AppConfig.config.imgUrl+'myphotos/';	

    setTimeout(() => {
 
    	this.grid.push(

	  	[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	],
	  		[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	],
	  		[
	  		imgurl+'3.jpg', 	 		
	  		imgurl+'4.jpg', 	 		
	  	],
	   	[
	  		imgurl+'5.jpg', 	 		
	  		imgurl+'6.jpg', 	 		
	  	]

    	);



      infiniteScroll.complete();
    }, 500);
  }

}
