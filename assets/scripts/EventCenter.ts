import { EventEnum } from "./EventEnum";

//  BaseInstance 类
class BaseInstance<T> {
    static instance: any;
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}

// 定义 IEventAction 接口
interface IEventAction {
    // 这里可以根据需要定义通用的方法，由于原代码中没有明确的通用方法，这里先留空
}

// 定义 EventOne 类
class EventOne<T1> implements IEventAction {
    private actions: Array<(arg: T1) => void> = [];

    constructor(action: (arg: T1) => void) {
        this.addAct(action);
    }

    addAct(action: (arg: T1) => void) {
        this.actions.push(action);
    }

    removeAct(action: (arg: T1) => void) {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }

    invokeAct(arg: T1) {
        this.actions.forEach(action => action(arg));
    }
}

// 定义 EventTwo 类
class EventTwo<T1, T2> implements IEventAction {
    private actions: Array<(arg1: T1, arg2: T2) => void> = [];

    constructor(action: (arg1: T1, arg2: T2) => void) {
        this.addAct(action);
    }

    addAct(action: (arg1: T1, arg2: T2) => void) {
        this.actions.push(action);
    }

    removeAct(action: (arg1: T1, arg2: T2) => void) {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }

    invokeAct(arg1: T1, arg2: T2) {
        this.actions.forEach(action => action(arg1, arg2));
    }
}

// 定义 EventThree 类
class EventThree<T1, T2, T3> implements IEventAction {
    private actions: Array<(arg1: T1, arg2: T2, arg3: T3) => void> = [];

    constructor(action: (arg1: T1, arg2: T2, arg3: T3) => void) {
        this.addAct(action);
    }

    addAct(action: (arg1: T1, arg2: T2, arg3: T3) => void) {
        this.actions.push(action);
    }

    removeAct(action: (arg1: T1, arg2: T2, arg3: T3) => void) {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }

    invokeAct(arg1: T1, arg2: T2, arg3: T3) {
        this.actions.forEach(action => action(arg1, arg2, arg3));
    }
}

class EventCenter extends BaseInstance<EventCenter> {
    // 事件无值相关
    private eventNonDic: Map<EventEnum, Array<() => void>> = new Map();

    bind(name: EventEnum, action: () => void) {
        let tAct = this.eventNonDic.get(name);
        if (tAct) {
            tAct.push(action);
        } else {
            tAct = [action];
            this.eventNonDic.set(name, tAct);
        }
    }

    fire(name: EventEnum) {
        const tAct = this.eventNonDic.get(name);
        if (tAct) {
            tAct.forEach(action => action());
        }
    }

    unBind(name: EventEnum, action: () => void) {
        const tAct = this.eventNonDic.get(name);
        if (tAct) {
            const index = tAct.indexOf(action);
            if (index !== -1) {
                tAct.splice(index, 1);
            }
        }
    }

    // 事件有值相关
    private eventActionDic: Map<EventEnum, IEventAction> = new Map();

    // 一个值
    fireOne<T1>(name: EventEnum, obj: T1) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventOne<T1>)?.invokeAct(obj);
        }
    }

    bindOne<T1>(name: EventEnum, action: (arg: T1) => void) {
        let tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventOne<T1>)?.addAct(action);
        } else {
            tAct = new EventOne(action);
            this.eventActionDic.set(name, tAct);
        }
    }

    unBindOne<T1>(name: EventEnum, action: (arg: T1) => void) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventOne<T1>)?.removeAct(action);
        }
    }

    // 两个值
    fireTwo<T1, T2>(name: EventEnum, t1: T1, t2: T2) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventTwo<T1, T2>)?.invokeAct(t1, t2);
        }
    }

    bindTwo<T1, T2>(name: EventEnum, action: (arg1: T1, arg2: T2) => void) {
        let tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventTwo<T1, T2>)?.addAct(action);
        } else {
            tAct = new EventTwo(action);
            this.eventActionDic.set(name, tAct);
        }
    }

    unBindTwo<T1, T2>(name: EventEnum, action: (arg1: T1, arg2: T2) => void) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventTwo<T1, T2>)?.removeAct(action);
        }
    }

    // 三个值
    fireThree<T1, T2, T3>(name: EventEnum, t1: T1, t2: T2, t3: T3) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventThree<T1, T2, T3>)?.invokeAct(t1, t2, t3);
        }
    }

    bindThree<T1, T2, T3>(name: EventEnum, action: (arg1: T1, arg2: T2, arg3: T3) => void) {
        let tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventThree<T1, T2, T3>)?.addAct(action);
        } else {
            tAct = new EventThree(action);
            this.eventActionDic.set(name, tAct);
        }
    }

    unBindThree<T1, T2, T3>(name: EventEnum, action: (arg1: T1, arg2: T2, arg3: T3) => void) {
        const tAct = this.eventActionDic.get(name);
        if (tAct) {
            (tAct as EventThree<T1, T2, T3>)?.removeAct(action);
        }
    }

    clear() {
        this.eventActionDic.clear();
        this.eventNonDic.clear();
    }
}

export default EventCenter;