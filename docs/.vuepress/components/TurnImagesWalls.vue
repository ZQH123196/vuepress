<template>
  <div class="wrapper">
    <ul>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <div class="image"></div>
          <div class="title">image</div>
          <div class="dir">
            <div class="header">bird</div>
            <div class="close"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40rem;
  width: 60rem;
  background-color: black;
  border: 1px solid red;
}

.wrapper .inner {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.wrapper .item .inner .image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
}

.wrapper ul {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 90%;
}

.wrapper ul li {
  flex: 0 1 auto;
  height: 100%;
  width: 100%;
  border: 1px solid white;
  border-radius: 20px;
}

.wrapper ul li:nth-of-type(1) .image {
    background-image: url('/images/1.jpg')
}
.wrapper ul li:nth-of-type(2) .image {
    background-image: url('/images/1.jpg')
}
.wrapper ul li:nth-of-type(3) .image {
    background-image: url('/images/1.jpg')
}
.wrapper ul li:nth-of-type(4) .image {
    background-image: url('/images/1.jpg')
}
.wrapper ul li:nth-of-type(5) .image {
    background-image: url('/images/1.jpg')
}
.wrapper ul li:nth-of-type(6) .image {
    background-image: url('/images/1.jpg')
}
</style>
