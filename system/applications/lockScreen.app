<div class="lockScreen hidden" id="lockScreen">
    <div class="centeredAbsolute centerText">
        <div class="lockScreenlockBackground">
            <span class="material-icons">lock</span>
        </div>
        <h3><b><span id="lockScreenUsername"></span></b>'s account is locked</h3>
        <p>Enter password to unlock:</p>
        <input type="password" id="lockScreenPasswordInputField">
        <button class="lockScreenUnlockButton" onclick="new PowerLogic().unlock();"><span class="material-icons">arrow_forward_ios</span></button>
    </div>
</div>