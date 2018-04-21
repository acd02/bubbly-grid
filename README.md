# <a name="top"></a> Bubbly Grid System

This is not another **12**-column grid system, this is an **up-to-you**-column grid system.

This is also not an HTML grid system, meaning you're gonna be able to keep your markup clean and tidy.

Made with calc() and Flexbox, so it will support the latest versions of Chrome, Firefox, Safari, Opera (not opera mini) & IE 11+.

Built in [PostCSS](http://postcss.org/), so it will work with the preprocessor of your choice.

___

Wanna see some nicer [doc](https://alx-l.github.io/bubbly-grid/)?

Wanna see some [demos](https://codepen.io/collection/DKNwJZ/)?

[npm](https://www.npmjs.com/package/postcss-bubbly-grid)


- [Installation](#installation)
- [Usage](#usage)
- [Symmetrical grid](#sym-grid)
  - [Col](#col)
  - [Gutter](#gutter)
  - [Stretch](#stretch)
  - [Media-queries](#sym-media)
- [Asymmetrical grid](#asym-grid)
  - [Push](#push)
  - [Pull](#pull)
  - [Center](#center)
  - [Media-queries](#asym-media)

## <a name="installation"></a> Installation

`npm install postcss-bubbly-grid`

## <a name="usage"></a> Usage
**[:arrow_up: back to top](#top)**

How to use it :

```js
// postcss.config.js

const bubblyGrid = require('postcss-bubbly-grid')

module.exports = {
  plugins: [
    bubblyGrid()
  ]
}


```

## <a name="sym-grid"></a> Sym Grid (symmetrical only)

Make sure the parent container is set to display `flex` :

```scss
.container {
  display: flex;
  flex-wrap: wrap;
}
```

## <a name="col"></a> Col
**[:arrow_up: back to top](#top)**

- number of columns per row

```scss
.container {
  display: flex;
}

.item {
  sym-grid: 4, 20px;
}
```

- You'll get 4 columns per row
- and a gutter of 20px between each column

The HTML :

```html
<div class="container">
  <div class="item">
    item 01
  </div>
  ...
  <div class="item">
    item 08
  </div>
</div>
```

![col](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/col.png)


## <a name="gutter"></a> Gutter
**[:arrow_up: back to top](#top)**

- width of the **gutter** (values can be in 'px', 'em', 'rem' or '%')

```scss

.item {
  sym-grid: 3, 2em;
}
```
- You'll get 3 columns per row
- You'll get a gutter of 2em between each column

![gutter](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/gutter.png)

## <a name="stretch"></a> Stretch
**[:arrow_up: back to top](#top)**

- *default value is false*

- Use it when you want the last item in the row to take the full width of the remaining space :

```scss

.item {
  sym-grid: 3 2em stretch;
}
```

The HTML :

```html
<div class="container">
  <div class="item">
    item 01
  </div>
  ...
  <div class="item">
    item 05
  </div>
</div>
```

![stretch](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/stretch.png)


## <a name="sym-media"></a> media-queries
**[:arrow_up: back to top](#top)**

**Media queries and new cycles :**

Let's say that when the window width gets below 420px, you wanna change the number of cols per row :

```scss
.item {
  sym-grid: 4 20px;
}

@media screen and (max-width: 420px) {
  sym-grid: 2 2em stretch
}
```

- First, we set a new cycle with: `2`
- Then, we set a new value for the **gutter**: `2em`

![sym-mq](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/sym-mq.png)

**Media queries and stretch :**

Let's say that when the window width gets below 420px, you wanna get rid of the stretching stuff :

```scss
.item {
  sym-grid: 4 20px stretch;
}

@media screen and (max-width: 420px) {
  sym-grid: 2 20px nostretch;
}

```

___

## <a name="asym-grid"></a> Asym Grid (asymmetrical grid)
**[:arrow_up: back to top](#top)**

- You can set up another ratio everytime you defining a new row
- The gutter value can be in 'px', 'em', 'rem' or '%'
- The gutter value must be the **same** across the different declarations defining a row
- To remove the margin-right on the **last** element of a row, we must declare it with: `last`
- Make sure the parent container is set to display `flex`

Let's make an asymmetrical grid :

```scss
.container {
  display: flex;
  flex-wrap: wrap;
}

/* -- first row -- */

.LeftSide {
  asym-grid: 2/10 20px;
}

.InBetween {
  asym-grid: 6/10 20px;
}

.RightSide {
  asym-grid: 2/10 20px last;
}


/* -- second row -- */

.left-side {
  asym-grid: 10/20 10px;
}

.in-between {
  asym-grid: 7/20 10px;
}

.right-side {
  asym-grid: 3/20 10px last;
}


/* -- third row -- */

.left__side {
  asym-grid: 3/12 2em;

}

.in__between {
  asym-grid: 3/12 2em;
}

.right__side {
  asym-grid: 6/12 2em last;
}

```

The HTML :

```html
<div class="container">
  <!-- first row -->
  <div class="LeftSide">
    LeftSide
  </div>
  <div class="InBetween">
    InBetween
  </div>
  <div class="RightSide">
    RightSide
  </div>
  <!-- second row -->
  <div class="left-side">
    left-side
  </div>
  <div class="in-between">
    in-between
  </div>
  <div class="right-side">
    right-side
  </div>
  <!-- third row -->
  <div class="left__side">
    left__side
  </div>
  <div class="in__between">
    in__between
  </div>
  <div class="right__side">
    right__side
  </div>
</div>
```

![asym-grid](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-grid.png)


## <a name="push"></a> Push
**[:arrow_up: back to top](#top)**

Wanna push that one col to the right so that it's centered? easy :

```scss
.one {
  asym-grid: 4/12, 20px;
}

.two {
  asym-grid: 2/12 20px;
  push: 1/12;
}

.three {
  asym-grid: 4/12, 20px last;
}

```

The HTML :

```html
<div class="container">
  <div class="one">
    one
  </div>
  <div class="two">
    two
  </div>
  <div class="three">
    three
  </div>
</div>
```

![push](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/push.png)

Alternatively, you can also use negative values if you wanna **push** an element to the left, e.g., `push: -1/12` is the same as `pull: 1/12`

## <a name="$pull"></a> $pull
**[:arrow_up: back to top](#top)**

Wanna pull a col to the left? :

```scss
.one {
  asym-grid: 4/12 20px;
}

.two {
  asym-grid: 2/12 20px;
  push: 6/12;
}

.three {
  asym-grid: 4/12 20px;
  pull: 3/12;
}
```

The HTML :

```html
<div class="container">
  <div class="one">
    one
  </div>
  <div class="two">
    two
  </div>
  <div class="three">
    three
  </div>
</div>
```

![push](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/pull.png)

Alternatively, you can also use negative values if you wanna **pull** an element to the right, e.g., `pull: -1/12` is the same as `push: 1/12`

## <a name="center"></a> Center
**[:arrow_up: back to top](#top)**

If you wish to have an element centered and by itself on his own line, you can use `center: true;`

## <a name="asym-media"></a> Media-queries
**[:arrow_up: back to top](#top)**

Above 760px :

```scss
.one {
  asym-grid: 2/10, 20px;
  push: 8/10;
}

.two {
  asym-grid: 6/10 20px;
}

.three {
  asym-grid: 2/10 20px last;
  pull: 8/10;
}

```

![asym-mq-b](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-b.png)

Below 760px :

If you get bored of all the pushing and pulling around, use `push: reset;` or `pull: reset;`

```scss
.one {
  @media screen and (max-width: 760px) {
    asym-grid: 1/3 20px;
    push: reset;
  }
}

.two {
  @media screen and (max-width: 760px) {
   asym-grid: 1/3 20px;
  }
}

.three {
  @media screen and (max-width: 760px) {
    asym-grid: 1/3 10px;
    pull: reset;
  }
}

```

![asym-mq-a](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-a.png)


## The End

Et voilà, I guess this is it...Now it's your turn to build some crazy layouts :)

**[:arrow_up: back to top](#top)**
