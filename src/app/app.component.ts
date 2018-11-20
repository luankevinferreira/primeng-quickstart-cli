import {Component, OnInit} from "@angular/core";
import {Car} from "./domain/car";
import {CarService} from "./services/carservice";
import {SelectItem} from "primeng/api";

interface City {
    name:string;
    code:string;
}

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})
export class AppComponent implements OnInit {

    displayDialog:boolean;

    car:Car = new PrimeCar();

    selectedCar:Car;

    newCar:boolean;

    cars:Car[];

    cols:any[];

    cities1:SelectItem[];

    cities2:City[];

    selectedCity1:City;

    selectedCity2:City;

    constructor(private carService:CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];

        //SelectItem API with label-value pairs
        this.cities1 = [
            {label: 'Select City', value: null},
            {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
            {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
        ];

        //An array of cities
        this.cities2 = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
    
    testDropDown() {
        console.log("Selected City 1: ", this.selectedCity1);
        console.log("Selected City 2: ", this.selectedCity2);
    }

    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i !== index);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.car = {...event.data};
        this.displayDialog = true;
    }

    findSelectedCarIndex():number {
        return this.cars.indexOf(this.selectedCar);
    }

    filename:string = "filename";
    url:string = "http://localhost:8080/jackrabbit";

    beforeUpload() {
        console.log("before upload.");
    }
}
