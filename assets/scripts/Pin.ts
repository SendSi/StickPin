import { _decorator, CircleCollider2D, Component, Contact2DType, Node, tween, Vec3 } from 'cc';
import { Circle } from './Circle';
import { GameMgr } from './GameMgr';
import EventCenter from './EventCenter';
import { EventEnum } from './EventEnum';
const { ccclass, property } = _decorator;

@ccclass('Pin')
export class Pin extends Component {
    protected onLoad(): void {
        const collider = this.node.getComponent(CircleCollider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onContactBegin, this);
    }

    onContactBegin(contact: any) {
        EventCenter.getInstance().fire(EventEnum.E_GameOver);
    }

    protected onDestroy(): void {
        const collider = this.node.getComponent(CircleCollider2D);
        collider.off(Contact2DType.BEGIN_CONTACT, this.onContactBegin, this);
    }

    moveTo(targetPos: Vec3, duration: number, father: Node, finishCB: Function = null) {
        tween(this.node).to(duration, { position: targetPos })
            .call(() => {
                if (father != null) {
                    let wPos = this.node.worldPosition;
                    let wAngle = this.node.worldRotation;
                    this.node.setParent(father);
                    this.node.setWorldPosition(wPos);
                    this.node.setWorldRotation(wAngle);
                }

                if (finishCB != null) {
                    finishCB();
                }
            })
            .start();
    }
}


