import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Circle')
export class Circle extends Component {
    @property
    rotationSpeed: number = 10;

    isAngle: boolean = true;

    update(deltaTime: number) {
        if (this.isAngle == false) return;

        this.node.angle -= this.rotationSpeed * deltaTime;
    }

    SetStopAngle() {
        this.isAngle = false;
    }
}


