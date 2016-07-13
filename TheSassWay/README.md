
# <a name="top"></a> Bubbly Grid System

This is not another **12**-column grid system, this is an **up-to-you**-column grid system.

This is also not an HTML grid system, meaning you're gonna be able to keep your markup clean and tidy.

Made with calc(), so it will support the latest versions of Chrome, Firefox, Safari, Opera (not opera mini) & IE 9+.


___

Wanna see a [demo page](http://alex-l.com/bubbly-boilerplate/)?

Want the [stylus version](https://www.npmjs.com/package/bubbly-grid-stylus)?


- [Installation](#installation)
- [Usage](#usage)
- Symmetrical grid
  - [Columns](#$col)
  - [Gutters](#$gutter)
  - [Stretch](#$stretch)
  - [Nesting](#$sym-nest)
  - [Media-queries](#sym-media)
  - [Full](#$full)
- [Asymmetrical grid](#asym-grid)
  - [Push](#$push)
  - [Pull](#$pull)
  - [Center](#$center)
  - [Nesting](#$asym-nest)
  - [Media-queries](#asym-media)
  - [Last](#last)
- [Skewing Around](#$skew)

## <a name="installation"></a> Installation
[back to top](#top)

`npm install bubbly-grid-sass`

## <a name="usage"></a> Usage
[back to top](#top)

Here is an example of how you can use it :

```js
var sass      = require('gulp-sass'),


gulp.task('css-builder', function () {
  return gulp.src('./stylesheets/style.scss')
    .pipe(sass({
      includePaths: [
        './node_modules/baz',
        './node_modules/bubbly-grid-sass/bubbly-grid'
      ]}).on('error', sass.logError))
    .pipe(gulp.dest('./public/style'));
});
```

And import it at the top of your stylesheet :

```scss
@import 'bubbly-grid';
```

## Sym Grid (symmetrical only)

Let me introduce you to the mixin :

`@include sym-grid(4, 20px)`

Behind the scenes (director's cut) :

```scss
@mixin sym-grid($col: 1, $gutter: 10px, $stretch: false, $full: false)
```

Make sure to apply some clearfix mixin to the parent container, since every items will be floated inside :

```scss
.container {
  @include some-clearfix();

  .item {
    @include sym-grid(whatever);
  }
}
```

### <a name="$col"></a> $col
[back to top](#top)

- number of columns per row
- *default value is 1*


```scss
.container {
  @include some-clearfix();
  padding: 20px;

  .item {
    @include sym-grid(4, 20px);
    margin-bottom: 20px;
  }
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
    item 08
  </div>
</div>
```

- You'll get 4 columns per row
- and a gutter of 20px between each column


![col](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/col.png)


### <a name="$gutter"></a> $gutter
[back to top](#top)

- width of the gutter (values can be in 'px', 'em', 'rem' or '%')
- *default value is 10px*

```scss
.container {
  @include some-clearfix();
  padding: 2em;

  .item {
    @include sym-grid(3, 2em);
    margin-bottom: 2em;
  }
}
```
- You'll get 3 columns per row
- You'll get a gutter of 2em between each column


![gutter](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/gutter.png)

### <a name="$stretch"></a> $stretch
[back to top](#top)

- *default value is false*

- Use it when you want the last item in the row to take the full width of the remaining space :

```scss
.container {
  @include some-clearfix();

  .item {
    @include sym-grid(3, 2em, $stretch: true);
  }
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

### <a name="$sym-nest"></a> Nesting
[back to top](#top)

Note: With a bubbly grid, you don't need no context stuff when nesting, so go wild.

`@include nest()`

Behind the scenes (director's cut) :

```scss
@mixin nest($float: left) {
  float: $float;
  width: 100%;
}
```

So, I heard it was time to nest :

```scss
.big-daddy {
  @include some-clearfix();
  .item {
    @include sym-grid(3, 20px);
  }
}

.daddy {
  @include nest();
  .item {
    @include sym-grid(4, 10px);
  }
}

.prodigal-son {
  @include nest();
}

.lil-twin {
  @include sym-grid(2, 10px);
}

.left .item {
  @include sym-grid(2, 5px);
}

.right .item {
  @include sym-grid(3, 5px, $stretch: true);
}
```

The HTML :

```html
<div class="big-daddy">
    <div class="item">
      <p>first lvl 01</p>
    </div>
    ...
    <div class="daddy">
      <div class="item">
        <p>second lvl 01</p>
      </div>
      ...
      <div class="prodigal-son">
        <div class="lil-twin left">
          <div class="item">
            <p>third lvl 01</p>
          </div>
          ...
        </div>
        <div class="lil-twin right">
          <div class="item">
            <p>third lvl 01</p>
          </div>
          ...
        </div>
      </div>
    </div>
</div>
```

![nest](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/nest.png)

### <a name="sym-media"></a> media-queries
[back to top](#top)

**Media queries and new cycles :**


Let's say that when the window width gets below 420px, you wanna change the number of cols per row :

```scss
.item {
  @include sym-grid(4, 20px);

    @media screen and (max-width: 420px) {
      @include sym-grid(2, 2em, $stretch: true);
    }
}
```

- First, we set a new cycle with => 2
- Then, we set a new value for the $gutter => 2em
- If not declared, the $gutter value would've been => 10px (the default value)

![sym-mq](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/sym-mq.png)

**Media queries and $stretch :**

Let's say that when the window width gets below 420px, you wanna get rid of the stretching stuff :

```scss
.item {
  @include sym-grid(4, 20px, $stretch: true);

  @media screen and (max-width: 420px) {
    @include sym-grid(2, 20px, $stretch: reset)
  }
}
```

If you set up a new cycle and still want to maintain the stretching stuff, you have re-set it as well :

```scss
.item {
  @include sym-grid(4, 20px, $stretch: true);

  @media screen and (max-width: 420px) {
    @include sym-grid(2, 20px, $stretch: true)
  }
}
```

Once you have declared '$stretch', you will have to re-set it everytime you set up a new cycle :

```scss
.item {
  @include sym-grid(8, 20px, $stretch: true);

  @media screen and (max-width: 1200px) {
    @include sym-grid(5, 20px, $stretch: true);
  }

  @media screen and (max-width: 800px) {
    @include sym-grid(4, 10px, $stretch: reset);
  }

  @media screen and (max-width: 420px) {
    @include sym-grid(2, 5px, $stretch: true);
  }
}
```

### <a name="$full"></a> $full
[back to top](#top)

- *default value is false*
- Use it if you want each col to take the full width of its container (e.g., when on mobile devices) :

```scss
.item {
  @include sym-grid(5, 20px);

  @media screen and (max-width: 800px) {
    @include sym-grid(4, 40px, $stretch: true);
  }

  @media screen and (max-width: 420px) {
    @include sym-grid($full: true);
  }
}
```

![sym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/sym-full.png)

___

## <a name="asym-grid"></a> Asym Grid (asymmetrical grid)
[back to top](#top)

Meet the mixin :

`@include asym-grid(2/10, 20px)`

Behind the scenes (director's cut) :

```scss
@mixin asym-grid($col: 1/1, $gutter: 0px, $last: false, $push: false, $pull: false, $full: false)
```

- First, we set a **ratio** => 2/10 *(default value is 1/1)*
- You can set up another ratio everytime you defining a new row
- Then we set a gutter => 20px *(default value is 0px)*
- The gutter value can be in 'px', 'em', 'rem' or '%'
- The gutter value must be the **same** across the different declarations defining a row
- To remove the margin-right on the **last** element of a row, we add => $last: true

Let's make an asymmetrical grid :

```scss
.container {
  @include some-clearfix();
  padding: 20px;
}

/* -- first row -- */

.LeftSide {
  @include asym-grid(2/10, 20px)
}

.InBetween {
  @include asym-grid(6/10, 20px)
}

.RightSide {
  @include asym-grid(2/10, 20px, $last: true)
}

/* -- second row -- */

.left-side {
  @include asym-grid(10/20, 10px)
}
.in-between {
  @include asym-grid(7/20, 10px)
}
.right-side {
  @include asym-grid(3/20, 10px, $last: true)
}

/* -- third row -- */

.left__side {
  @include asym-grid(3/12, 2em)
}
.in__between {
  @include asym-grid(3/12, 2em)
}
.right__side {
  @include asym-grid(6/12, 2em, $last: true)
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

### <a name="$push"></a> $push
[back to top](#top)

Wanna push that one col to the right so that it's centered? easy :

```scss
.one {
  @include asym-grid(4/12, 20px)
}

.two {
  @include asym-grid(2/12, 20px, $push: 1/12)
}

.three {
  @include asym-grid(4/12, 20px, $last: true)
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

Alternatively, you can also use negative values if you wanna push an element to the left, e.g., $push: -1/12 is the same as => $pull: 1/12

### <a name="$pull"></a> $pull
[back to top](#top)

Wanna pull a col to the left? follow me :

```scss
.one {
  @include asym-grid(4/12, 20px)
}

.two {
  @include asym-grid(2/12, 20px, $push: 6/12)
}

.three {
  @include asym-grid(4/12, 20px, $pull: 3/12, $last: true)
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

Alternatively, you can also use negative values if you wanna pull an element to the right, e.g., $pull: -1/12 is the same as => $push: 1/12

### <a name="$center"></a> $center
[back to top](#top)

Sure, you can center a column by moving it around using `$push` or `$pull`, but you can also simply use this => `@include asym-center()`

Let's take a look at this exemple :

![push](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-center.png)

The HTML :

```html
<div class=container>
  <div class="half">
    asym-grid(1/2) + asym-center()
  </div>
  <div class="quarter">
    asym-grid(1/4) + asym-center()
  </div>
  <div class="third">
    asym-grid(1/3, 20px)
  </div>
  <div class="third">
    asym-grid(1/3, 20px)
  </div>
  <div class="third--last">
    asym-grid(1/3, 20px, last: true)
  </div>
</div>
```

SCSS :

```scss
.half {
  @include asym-grid(1/2);
  @include asym-center();

  @media screen and (max-width: 760px) {
    @include asym-grid(1/3); // it will still be centered
  }
}

.quarter {
  @include asym-grid(1/4);
  @include asym-center();

  @media screen and (max-width: 760px) {
    @include asym-grid(1); // set the width to 100%
  }
}

.third {
  @include asym-grid(1/3, 20px);
}

.third--last {
  @include asym-grid(1/3, 20px, last: true);
}

```

#### Media-queries :

if you want a col to take 100% of the width below a certain breakpoint, use `@include asym-grid(1)`, **do not use** `@include asym-grid($full: true)`, the layout will break.

### <a name="$asym-nest"></a> Nesting
[back to top](#top)

Note: With a bubbly grid, you don't need no context stuff when nesting, so go wild.

Nothing special here, but just for the hell of it :

```scss
.one {
  @include asym-grid(4/12, 20px);

  .item {
    @include sym-grid(2, 10px);
  }
}

.two {
  @include asym-grid(5/12, 20px);
}

.left {
  @include asym-grid(4/10, 20px);
}

.right {
  @include asym-grid(6/10, 20px, $last: true);
}

.three {
  @include asym-grid(3/12, 20px, $last: true);
}

.left .item,
.right .item,
.three .item {
  @include nest();
}
```

The HTML :

```html
<div class="container">
    <div class="one">
      <div class="item">
        <p>item 01</p>
      </div>
      ...
    </div>
    <div class="two">
      <div class="left">
        <div class="item">
          <p>item 01</p>
        </div>
        ...
      </div>
      <div class="right">
        <div class="item">
          <p>item 01</p>
        </div>
        ...
      </div>
    </div>
    <div class="three">
      <div class="item">
        <p>item 01</p>
      </div>
    </div>
</div>
```

![asym-nest](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-nest.png)

### <a name="asym-media"></a> Media-queries
[back to top](#top)

Above 760px :

```scss
.one {
  @include asym-grid(2/10, 20px, $push: 8/10)
}

.two {
  @include asym-grid(6/10, 20px)
}

.three {
  @include asym-grid(2/10, 20px, $pull: 8/10, $last: true)
}
```

![asym-mq-b](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-b.png)

Below 760px :

If you get bored of all the pushing and pulling around, use $push or $pull => **reset**

```scss
.one {
  @media screen and (max-width: 760px) {
    @include asym-grid(1/3, 20px, $push: reset)
  }
}

.two {
  @media screen and (max-width: 760px) {
    @include asym-grid(1/3, 20px)
  }
}

.three {
  @media screen and (max-width: 760px) {
    @include asym-grid(1/3, 10px, $pull: reset, $last: true)
  }
}
```

![asym-mq-a](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-a.png)

### <a name="$full"></a> $full
[back to top](#top)

- *default value is false*
- Use it if you want each col to take the full width of its container (e.g., when on mobile devices) :

```scss
.one {
  @media screen and (max-width: 320px) {
    @include asym-grid($full: true)
  }
}

.two {
  @media screen and (max-width: 320px) {
    @include asym-grid($full: true)
  }
}

.three {
  @media screen and (max-width: 320px) {
    @include asym-grid($full: true)
  }
}
```
![asym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-full.png)

## <a name="last"></a> $last
[back to top](#top)

Like $push and $pull, you can also **reset** the $last parameter it if you wish. Let's take a look at this stupid grid :

```scss
/* -- first row -- */

.one {
  @include asym-grid(1/2, 20px);
}

.two {
  @include asym-grid(1/2, 20px, $last: true);
}

/* -- second row -- */

.three {
  @include asym-grid(1/2, 20px);
}

.four {
  @include asym-grid(1/2, 20px, $last: true);
}

/* -- third row -- */

.five {
  @include asym-grid(1/3, 20px);
}

.six {
  @include asym-grid(1/3, 20px);
}

.seven {
  @include asym-grid(1/3, 20px, $last: true);
}

/* -- fourth row -- */

.eight {
  @include asym-grid(1/3, 20px);
}

.nine {
  @include asym-grid(1/3, 20px);
}

.ten {
  @include asym-grid(1/3, 20px, $last: true);
}

```

The HTML :

```html
<div class="container">
  <div class="one">
    item 01
  </div>
  <div class="two">
    item 02
  </div>
  <div class="three">
    item 03
  </div>
  <div class="four">
    item 04
  </div>
  <div class="five">
    item 05
  </div>
  <div class="six">
    item 06
  </div>
  <div class="seven">
    item 07
  </div>
  <div class="eight">
    item 08
  </div>
  <div class="nine">
    item 09
  </div>
  <div class="ten">
    item 10
  </div>
</div>
```

![asym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/last-b.png)

Now, let's get down to business :
```scss
@media and screen (max-width: 760px) {

  /* -- first row -- */
  .one {
    @include asym-grid(1/3, 20px);
  }

  .two {
    @include asym-grid(1/3, 20px, $last: reset);
  }

  .three {
    @include asym-grid(1/3, 20px, $last: true);
  }

  /* -- second row -- */

  .four {
    @include asym-grid(1/3, 20px, $last: reset);
  }

  .five {
    @include asym-grid(1/3, 20px);
  }

  .six {
    @include asym-grid(1/3, 20px, $last: true);
  }

  /* -- third row -- */

  .seven {
    @include asym-grid(1/4, 10px, $last: reset);
  }

  .eight {
    @include asym-grid(1/4, 10px);
  }

  .nine {
    @include asym-grid(1/4, 10px);
  }

  .ten {
    @include asym-grid(1/4, 10px, $last: true);
  }
}
```
![asym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/last-a.png)

### <a name="$skew"></a> $skew
[back to top](#top)

Last but not least, if you want to spice things up a little bit, I may got what you need :

`skew` is the name, and it looks a little something like this :

![skew](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/skew.png)

The HTML :

```html
<div class="container">
    <div class="left">
        <div class="item">
          .item inside .left
        </div>
    </div>
    <div class="right">
        <div class="item">
          .item inside .right
        </div>
    </div>
</div>
```

The scss :

```scss
.left {
  @include asym-grid(1/3);
  position: relative;
  z-index: 1; // make sure to always declare a z-index value, so your content stays visible
  &:before {
    @include skew(top-left, 5);
  }
  &:after {
    @include skew(bottom-left, 5);
  }

  .item {
    &:before {
      @include skew(top-right, 8);
    }
    &:after {
      @include skew(bottom-left, 8);
    }
  }
}

.right {
  @include asym-grid(2/3, $last: true);
  position: relative;
  z-index: 1;
  &:before {
    @include skew(top-right, 8);
  }
  &:after {
    @include skew(bottom-right, 8);
  }

  .item {
    &:before {
      @include skew(top-left, 8);
    }
    &:after {
      @include skew(bottom-left, 8);
    }
  }
}
```

So, let's take a closer look a this mixin :

`@include skew(top-left, 4)`

- The first argument of the mixin determines the direction, it can be **top-left** (default), **top-right**, **bottom-left** or **bottom-right**
- The second argument is for the skew value, e.g., 4 => 4deg

If it gets too messy, don't worry :

```scss
.foo {
  position: relative;
  z-index: 1;
  &:before {
    @include skew(bottom-left, 5);
  }
  @media screen and (max-width: 760) {
    &:before {
      @include skew($reset: true);
    }
  }
}
```

[back to top](#top)

## The End

Et voilà, I guess this is it...Now it's your turn to build some crazy layouts :)
