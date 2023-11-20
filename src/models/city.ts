class City {
    id: number;
    name: string;
    comfortIndex: number;
    sunnyDays: number;
    commuteTime: number;

    constructor(
        id: number,
        name: string,
        comfortIndex: number,
        sunnyDays: number,
        commuteTime: number
    ) {
        this.id = id;
        this.name = name;
        this.comfortIndex = comfortIndex;
        this.sunnyDays = sunnyDays;
        this.commuteTime = commuteTime;
    }
}

export default City;
