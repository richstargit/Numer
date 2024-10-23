import { create, all } from 'mathjs';

const math = create(all);
//divided

export function ForwardOh1(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const forh1p1 = () => {
            return (FX(X + h) - FX(X)) / h;
        }
        const forh1p2 = () => {
            return (FX(X + 2 * h) - 2 * FX(X + h) + FX(X)) / (math.pow(h, 2));
        }
        const forh1p3 = () => {
            return (FX(X + 3 * h) - 3 * FX(X + 2 * h) + 3 * FX(X + h) - FX(X)) / (math.pow(h, 3));
        }
        const forh1p4 = () => {
            return (FX(X + 4 * h) - 3 * FX(X + 3 * h) + 3 * FX(X + 2 * h) - FX(X + h) + FX(X)) / (math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "forward",
            Oh:"oh1/2",
            result: [forh1p1(),forh1p2(),forh1p3(),forh1p4()],
            error: [Err(forh1p1(),1),Err(forh1p2(),2),Err(forh1p3(),3),Err(forh1p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "forward",
            errors: error
        });
    }
}

export function BackwardOh1(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const back1p1 = () => {
            return (FX(X) - FX(X - h)) / h;
        }
        const back1p2 = () => {
            return (FX(X) - 2 * FX(X - h) + FX(X - 2 * h)) / (math.pow(h, 2));
        }
        const back1p3 = () => {
            return (FX(X) - 3 * FX(X - h) + 3 * FX(X - 2 * h) - FX(X - 3 * h)) / (math.pow(h, 3));
        }
        const back1p4 = () => {
            return (FX(X) - 4 * FX(X - h) + 6 * FX(X - 2 * h) - 4 * FX(X - 3 * h) + FX(X - 4 * h)) / (math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "backward",
            Oh:"oh1/2",
            result: [back1p1(),back1p2(),back1p3(),back1p4()],
            error: [Err(back1p1(),1),Err(back1p2(),2),Err(back1p3(),3),Err(back1p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "backward",
            errors: error
        });
    }
}

export function CentralOh2(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const cen1p1 = () => {
            return (FX(X + h) - FX(X - h)) / (2 * h);
        }
        const cen1p2 = () => {
            return (FX(X + h) - 2 * FX(X) + FX(X - h)) / (math.pow(h, 2));
        }
        const cen1p3 = () => {
            return (FX(X + 2 * h) - 2 * FX(X + h) + 2 * FX(X + h) - FX(X - 2 * h)) / (2 * math.pow(h, 3));
        }
        const cen1p4 = () => {
            return (FX(X + 2 * h) - 4 * FX(X + h) + 6 * FX(X) - 4 * FX(X + h) + FX(X - 2 * h)) / (math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "central",
            Oh:"oh1/2",
            result: [cen1p1(),cen1p2(),cen1p3(),cen1p4()],
            error: [Err(cen1p1(),1),Err(cen1p2(),2),Err(cen1p3(),3),Err(cen1p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "central",
            errors: error
        });
    }
}

export function ForwardOh2(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const forh2p1 = () => {
            return (-FX(X + 2 * h) + 4 * FX(X + h) - 3 * FX(X)) / (2 * h);
        }
        const forh2p2 = () => {
            return (-FX(X + 3 * h) + 4 * FX(X + 2 * h) - 5 * FX(X + h) + 2 * FX(X)) / (math.pow(h, 2));
        }
        const forh2p3 = () => {
            return (-3 * FX(X + 4 * h) + 14 * FX(X + 3 * h) - 24 * FX(X + 2 * h) + 18 * FX(X + h) - 5 * FX(X)) / (2 * math.pow(h, 3));
        }
        const forh2p4 = () => {
            return (-2 * FX(X + 5 * h) + 11 * FX(X + 4 * h) - 24 * FX(X + 3 * h) + 26 * FX(X + 2 * h) - 14 * FX(X + h) + 3 * FX(X)) / (math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "forward",
            Oh:"oh2/4",
            result: [forh2p1(),forh2p2(),forh2p3(),forh2p4()],
            error: [Err(forh2p1(),1),Err(forh2p2(),2),Err(forh2p3(),3),Err(forh2p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "forward",
            errors: error
        });
    }
}

export function BackwardOh2(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const back2p1 = () => {
            return (3 * FX(X) - 4 * FX(X - h) + FX(X - 2 * h)) / (2 * h);
        }
        const back2p2 = () => {
            return (2 * FX(X) - 5 * FX(X - h) + 4 * FX(X - 2 * h) - FX(X - 3 * h)) / (math.pow(h, 2));
        }
        const back2p3 = () => {
            return (5 * FX(X) - 18 * FX(X - h) + 24 * FX(X - 2 * h) - 14 * FX(X - 3 * h) + 3 * FX(X + 4 * h)) / (2 * math.pow(h, 3));
        }
        const back2p4 = () => {
            return (3 * FX(X) - 14 * FX(X - h) + 26 * FX(X - 2 * h) - 24 * FX(X - 3 * h) + 11 * FX(X - 4 * h) - 2 * FX(X - 5 * h)) / (math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "backward",
            Oh:"oh2/4",
            result: [back2p1(),back2p2(),back2p3(),back2p4()],
            error: [Err(back2p1(),1),Err(back2p2(),2),Err(back2p3(),3),Err(back2p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "backward",
            errors: error
        });
    }
}

export function CentralOh4(Sol,NumberX,NumberH) {
    try {

        const fx=Sol;
        const h = Number(NumberH);
        const X = Number(NumberX);

        const FX = (n) => {
            return math.evaluate(fx, { x: n })
        }

        const cen2p1 = () => {
            return (-FX(X + 2 * h) + 8 * FX(X + h) - 8 * FX(X - h) + FX(X - 2 * h)) / (12 * h);
        }
        const cen2p2 = () => {
            return (-FX(X + 2 * h) + 16 * FX(X + h) - 30 * FX(X) + 16 * FX(X - h) - FX(X - 2 * h)) / (12 * math.pow(h, 2));
        }
        const cen2p3 = () => {
            return (-FX(X + 3 * h) + 8 * FX(X + 2 * h) - 13 * FX(X + h) + 13 * FX(X - h) - 8 * FX(X - 2 * h) + FX(X - 3 * h)) / (8 * math.pow(h, 3));
        }
        const cen2p4 = () => {
            return (-FX(X + 3 * h) + 12 * FX(X + 2 * h) - 39 * FX(X + h) + 56 * FX(X) - 39 * FX(X - h) + 12 * FX(X - 2 * h) - FX(X - 3 * h)) / (6 * math.pow(h, 4));
        }

        const Err = (solResult,n) => {
            let str = fx;
            for (let i = 0; i < n; i++) {
                str = math.derivative(str, 'x').toString();
            }
            return math.abs(math.evaluate(str, { x: X }) - solResult) / math.evaluate(str, { x: X })

        }
        
        return ({
            request: "success",
            mode: "central",
            Oh:"oh2/4",
            result: [cen2p1(),cen2p2(),cen2p3(),cen2p4()],
            error: [Err(cen2p1(),1),Err(cen2p2(),2),Err(cen3p3(),3),Err(cen4p4(),4)]
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "central",
            errors: error
        });
    }
}