<template>
    <div class="All-flex">
        <div class="Add-on-Prepended">
            <span>Add-on-Prepended</span>
            <div class="InputBlock-1">
                <spen> Amout </spen>
                <input>
            </div>
            <div class="InputBlock-2">
                <span> Search </span>
                <input>
            </div>
        </div>
        <div class="Add-on-Appended">
            <span>Add-on-Appended</span>
            <div class="InputBlock-1">
                <input>
                <spen> Go </spen>
            </div>
            <div class="InputBlock-2">
                <input>
                <span> Star </span>
            </div>
        </div>
        <div class="Appended-and-Prepended-Add-ons">
            <span>Appended-and-Prepended-Add-ons</span>
            <div class="InputBlocks">
                <div class="InputBlock-1">
                    <span class="Email-icon"> Email </span>
                    <input placeholder="Example One">
                    <button class="Button"> Send </button>
                </div>
                <div class="InputBlock-2">
                    <span class="Lock"> Lock </span>
                    <input placeholder="Example One">
                    <button class="Button"> Encrypt </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.All-flex {
    margin: 0;
    padding: 0;
    min-width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

/* 1 */
.Add-on-Prepended {
    margin: 0;
    padding: 0;
    min-width: 49%;
    max-width: 49%;
    margin-right: 1%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.Add-on-Prepended .InputBlock-1,
.Add-on-Prepended .InputBlock-2 {
    flex: 1;
    display: flex;
    flex-direction: row;
}

.Add-on-Prepended input {
    flex: 1;
}

/* 2 */
.Add-on-Appended {
    margin: 0;
    padding: 0;
    min-width: 49%;
    max-width: 49%;
    margin-right: 1%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.Add-on-Appended .InputBlock-1,
.Add-on-Appended .InputBlock-2 {
    flex: 1;
    display: flex;
    flex-direction: row;
}

.Add-on-Appended input {
    flex: 1;
}

/* 3 */
.Appended-and-Prepended-Add-ons {
    margin: 0;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.Appended-and-Prepended-Add-ons .InputBlocks {
    margin: 0;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
}

.Appended-and-Prepended-Add-ons .InputBlocks .InputBlock-1,
.Appended-and-Prepended-Add-ons .InputBlocks .InputBlock-2 {
    min-width: 49%;
    max-width: 49%;
    margin-right: 1%;
    flex: 1;
    display: flex;
    flex-direction: row;
}

.Appended-and-Prepended-Add-ons .InputBlocks input {
    flex: 1;
}
/* 适配小屏幕 */
/* 768px === ipad 宽度，这里设置 767px*/
@media screen and (max-width: 767px) {
    .All-flex {
        flex-direction: column;
    }
    .Appended-and-Prepended-Add-ons .InputBlocks {
        flex-direction: column;
    }
}
</style>
