class Helper {

    public static ranMinMax(minimo: number, maximo: number) {
        return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    }

    public static node(id: string) {
        return document.getElementById(id);
    }
}

