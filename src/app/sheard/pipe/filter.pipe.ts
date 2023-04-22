import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    transform(value: any, target: string): any {
        if (target) {
            if (value.toLowerCase().includes(target.toLowerCase())) {
                return value;
            }
        } else {
            return value
        }
    }
}

@Pipe({
    name : 'filterImg'
})
export class filterImgpipe implements PipeTransform{ 

    transform(value: any, target: string) {
          if(!target){
            return value;
          }else {
            return value.filter((element : any) =>{
                return element.name.toLowerCase().includes(target.toLowerCase())
            })
          }
    }
}


@Pipe({
    name : 'sort'
})
export class SortPipe implements PipeTransform{
    transform(val : any, target : string){
        return val.sort((a:any, b : any) =>{
             return b - a
        })
     }
}