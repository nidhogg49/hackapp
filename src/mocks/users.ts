import { eventData } from "../context/types";
import image1 from '../img/person/665x495.jpg';
import image2 from '../img/person/interesting_201503030958440.jpg';
import image3 from '../img/person/fit_795_547_false_crop.jpeg';

const user:Array<eventData> = [
        {
            "dates":[{
                "start": "none",
                "end" : "none"
            }],
            "description" : "Разработчик. Люблю кататься на лыжах",
            "images":[{"image": image1}],
            "price":"0",
            "title":"Иванов Иван Иванович"
        },
        {
            "dates":[{
                "start": "none",
                "end" : "none"
            }],
            "description" : "Аналитик. Машинки, сериалы",
            "images":[{"image": image2}],
            "price":"0",
            "title":"Петров Серега Эдуардович"
        },{
            "dates":[{
                "start": "none",
                "end" : "none"
            }],
            "description" : "Тестировщик. Жи есть да",
            "images":[{"image": image3}],
            "price":"0",
            "title":"Джигурда Таня Петровна"
        }
    ];

export default user;