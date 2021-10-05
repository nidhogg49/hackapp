export interface AppContextInterface {
    authenticated: boolean;
    lang: string;
    theme: string;
}

interface DateArr {
    end: string;
    start: string;
};

interface ImagesArray {
    image: string;
};

export interface eventData {
    dates: Array<DateArr>;
    description: string;
    images: Array<ImagesArray>;
    price: string;
    title: string;
}