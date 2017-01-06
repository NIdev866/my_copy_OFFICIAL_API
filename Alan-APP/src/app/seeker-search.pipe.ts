import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seekerSearch'
})
export class SeekerSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    	if(value.length === 0)
    	{
    		return value;
    	}

    	let resultArray = [];
    	for(let item of value) {
    		let name =item.first_name + " " + item.last_name;
    		if(name.toLowerCase().match('^.*'+args + '.*$')) {
    			resultArray.push(item);
    		}
    	}
    	return resultArray;
    }

}
