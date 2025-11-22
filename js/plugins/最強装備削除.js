// ※rmmz_scenes.js から それっぽい部分を抜き出して改変。   /♪で検索すると変更箇所を辿れます。
//-----------------------------------------------------------------------------
// Scene_Equip
//
// 装備画面のシーンクラス。

Scene_Equip.prototype.createCommandWindow = function() {  //♪ 要らないところを切除
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_EquipCommand(rect);
    this._commandWindow.hide();       //♪ コマンドウインドウを非表示


    this._commandWindow.deactivate(); //♪ コマンドウインドウを停止(非アクティブ化)
};

Scene_Equip.prototype.createSlotWindow = function() {
    const rect = this.slotWindowRect();
    this._slotWindow = new Window_EquipSlot(rect);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
    this._slotWindow.setHandler("cancel", this.popScene.bind(this));      //♪ コマンドウインドウから移植
    this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));   //♪ コマンドウインドウから移植
    this._slotWindow.setHandler("pageup", this.previousActor.bind(this)); //♪ コマンドウインドウから移植
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.slotWindowRect = function() {
    const commandWindowRect = this.commandWindowRect();
    const wx = this.statusWidth();
    const wy = this.mainAreaTop();    //♪ 変更前 commandWindowRect.y + commandWindowRect.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this.mainAreaHeight(); //♪ 変更前 this.mainAreaHeight() - commandWindowRect.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Equip.prototype.refreshActor = function() {
    const actor = this.actor();
    this._statusWindow.setActor(actor);
    this._slotWindow.setActor(actor);
    this._itemWindow.setActor(actor);
    this._slotWindow.activate(); //♪ スロットウィンドウを起動する
};

Scene_Equip.prototype.onActorChange = function() { //♪ 要らないところを切除
    Scene_MenuBase.prototype.onActorChange.call(this);
    this.refreshActor();
};