import { Pipe, PipeTransform } from '@angular/core';
import { CarComponent } from '../components/car/car.component';
import { CarDetails } from '../models/carDetails';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetails[], filterText: string,colorName:string): CarDetails[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    colorName=colorName?colorName.toLocaleLowerCase():""
    if(filterText&&(!colorName||colorName==="undefined")){
      return value.filter((c:CarDetails)=>(c.modelName.toLocaleLowerCase().indexOf(filterText)&&(c.brandName.toLocaleLowerCase().indexOf(filterText)&&(c.colorName.toLocaleLowerCase().indexOf(filterText))))!==-1);
    }
    else if(filterText){
      return value.filter((c:CarDetails)=>(c.modelName.toLocaleLowerCase().indexOf(filterText)&&(c.brandName.toLocaleLowerCase().indexOf(filterText)&&(c.colorName.toLocaleLowerCase().indexOf(filterText))))!==-1&&c.colorName.toLocaleLowerCase().indexOf(colorName)!==-1);
    }
    else if(!filterText&&colorName!=="undefined"){
      return value.filter((c:CarDetails)=>(c.colorName.toLocaleLowerCase().indexOf(colorName))!==-1);
    }
    else{
      return value;
    }
  }    
}
