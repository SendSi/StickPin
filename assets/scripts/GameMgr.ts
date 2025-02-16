import { _decorator, Camera, Color, color, Component, director, Input, input, instantiate, Label, Node, Prefab, tween } from 'cc';
import { Pin } from './Pin';
import { Circle } from './Circle';
import EventCenter from './EventCenter';
import { EventEnum } from './EventEnum';
const { ccclass, property } = _decorator;

@ccclass('GameMgr')
export class GameMgr extends Component {

    @property(Camera)
    camera: Camera = null;

    @property
    targetOrthoSize: number = 500;

    @property(Color)
    targetColor: Color = new Color(255, 255, 255, 255);

    @property(Node)
    p1: Node = null;
    @property(Node)
    p2: Node = null;
    @property(Node)
    p3: Node = null;

    @property(Node)
    circle: Node = null;

    @property(Prefab)
    pinPrefab: Prefab = null;


    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.OnTouchStart, this);

        console.log(EventEnum);
        console.log(EventEnum.E_GameOver);

        EventCenter.getInstance().bind(EventEnum.E_GameOver, () => {
            this.SetGameOver();
        });
    }

    protected start(): void {
        this.pinGen();
    }
    private scoreNum: number = 0;

    @property(Label)
    private scoreLabel: Label = null;

    isGameOver: boolean = false;

    OnTouchStart(event: any) {
        if (this.isGameOver) return;

        this.curPin.moveTo(this.p3.position, this.moveToPos3, this.circle, () => {
            this.scoreLabel.string = this.scoreNum.toString();
        });

        this.curPin = null;
        this.pinGen();
        this.scoreNum++;
    }

    curPin: Pin = null;

    @property
    moveToPos3: number = 0.5;

    @property
    moveToPos2: number = 0.5;
    pinGen() {
        const pinNode = instantiate(this.pinPrefab);
        this.node.addChild(pinNode);
        pinNode.setPosition(this.p1.position);

        this.curPin = pinNode.getComponent(Pin);
        if (this.curPin) {
            this.curPin.moveTo(this.p2.position, this.moveToPos2, null);
        }
    }

    SetGameOver(): void {
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.circle.getComponent(Circle).SetStopAngle();

        tween(this.camera).to(0.5, { orthoHeight: this.targetOrthoSize }, {
            onUpdate: (target, ratio) => {
                this.camera.clearColor = this.targetColor.lerp(this.targetColor, ratio);
            }
        })
            .start();


        this.scheduleOnce(() => {
            director.loadScene(director.getScene().name);
        }, 2);

        console.log("game over");
    }



    protected onDestroy(): void {
        EventCenter.getInstance().unBind(EventEnum.E_GameOver, () => {
            this.SetGameOver();
        });
    }



}


