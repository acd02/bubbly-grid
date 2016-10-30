# <a name="top"></a> Bubbly Grid System

This is not another **12**-column grid system, this is an **up-to-you**-column grid system.

This is also not an HTML grid system, meaning you're gonna be able to keep your markup clean and tidy.

Made with calc(), so it will support the latest versions of Chrome, Firefox, Safari, Opera (not opera mini) & IE 9+.

___

Wanna see a [demo page](https://alx-l.github.io/bubbly-grid/)?

Available on [npm](https://www.npmjs.com/package/bubbly-grid-stylus).

Want the [scss version](https://www.npmjs.com/package/bubbly-grid-sass)?

- [Installation](#installation)
- [Usage](#usage)
- Symmetrical grid
  - [Columns](#$col)
  - [Gutters](#$gutter)
  - [Stretch](#$stretch)
  - [Nesting](#$sym-nest)
  - [Media-queries](#sym-media)
- [Asymmetrical grid](#asym-grid)
  - [Push](#$push)
  - [Pull](#$pull)
  - [Center](#$center)
  - [Nesting](#$asym-nest)
  - [Media-queries](#asym-media)
  - [Last](#last)

## <a name="installation"></a> Installation
[back to top](#top)

`npm install bubbly-grid-stylus`

## <a name="usage"></a> Usage
[back to top](#top)

Here is an exemple of how you can use it with Gulp :

```js
// gulpfile.js
var stylus = require('gulp-stylus');
var bubbly = require('bubbly-grid-stylus');


gulp.task('css-builder', function () {
  return gulp.src('./stylesheets/style.styl')
    .pipe(stylus({
      use:[foo(), baz(), bubbly()]
    }))
    .pipe(gulp.dest('./public/style'));
});

```

## Sym Grid (symmetrical only)

Let me introduce you to the mixin :

`sym-grid(4, 20px)`

Behind the scenes (director's cut) :

```stylus
sym-grid($col: 1, $gutter: 10px, $stretch: false, $full: false)
```

Make sure to apply some clearfix mixin to the parent container, since every items will be floated inside :

```stylus
.container
  some-clearfix()

  .item
    sym-grid(whatever)
```

### <a name="$col"></a> $col
[back to top](#top)

- number of columns per row
- *default value is 1*


```stylus
.container
  some-clearfix()

  .item
    sym-grid(4, 20px)
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

```stylus
.container
  some-clearfix()

  .item
    sym-grid(3, 2em)
```
- You'll get 3 columns per row
- You'll get a gutter of 2em between each column


![gutter](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/gutter.png)

### <a name="$stretch"></a> $stretch
[back to top](#top)

- *default value is false*

- Use it when you want the last item in the row to take the full width of the remaining space :

```stylus
.container
  some-clearfix()

  .item
    sym-grid(3, 2em, $stretch: true)
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

`nest()`

Behind the scenes (director's cut) :

```stylus
nest($float = left)
  float: $float
  width: 100%
```

So, I heard it was time to nest :

```stylus
.big-daddy
  some-clearfix()
  .item
    sym-grid(3, 20px)

.daddy
  nest()
  .item
    sym-grid(4, 10px)

.prodigal-son
  nest()

.lil-twin
  sym-grid(2, 10px)

.left .item
  sym-grid(2, 5px)

.right .item
  sym-grid(3, 5px, $stretch: true)
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

```stylus
.item
  sym-grid(4, 20px)

  @media screen and (max-width: 420px)
    sym-grid(2, 2em, $stretch: true);

```

- First, we set a new cycle with => 2
- Then, we set a new value for the gutter => 2em
- If not declared, the $gutter value would've been => 10px (the default value)

![sym-mq](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/sym-mq.png)

**Media queries and stretch :**

Let's say that when the window width gets below 420px, you wanna get rid of the stretching stuff :

```stylus
.item
  sym-grid(4, 20px, $stretch: true)

  @media screen and (max-width: 420px)
    sym-grid(2, 20px, $stretch: reset)

```

If you set up a new cycle and still want to maintain the stretching stuff, you have re-set it as well :

```stylus
.item
  sym-grid(4, 20px, $stretch: true)

  @media screen and (max-width: 420px)
    sym-grid(2, 20px, $stretch: true)

```

Once you have declared '$stretch', you will have to re-set it everytime you set up a new cycle :

```stylus
.item
  sym-grid(8, 20px, $stretch: true)

  @media screen and (max-width: 1200px)
    sym-grid(5, 20px, $stretch: true)

  @media screen and (max-width: 800px)
    sym-grid(4, 10px, $stretch: reset);

  @media screen and (max-width: 420px)
    sym-grid(2, 5px, $stretch: true)

```

___

## <a name="asym-grid"></a> Asym Grid (asymmetrical grid)
[back to top](#top)

Meet the mixin :

`asym-grid(2/10, 20px)`

Behind the scenes (director's cut) :

```stylus
asym-grid($col: 1/1, $gutter: 0px, $last: false, $push: false, $pull: false, $full: false)
```

- First, we set a **ratio** => 2/10 *(default value is 1/1)*
- You can set up another ratio everytime you defining a new row
- Then we set a gutter => 20px *(default value is 0px)*
- The gutter value can be in 'px', 'em', 'rem' or '%'
- The gutter value must be the **same** across the different declarations defining a row
- To remove the margin-right on the **last** element of a row, we add => $last: true

Let's make an asymmetrical grid :

```stylus
.container
  some-clearfix()

/* -- first row -- */

.LeftSide
  asym-grid(2/10, 20px)

.InBetween
  asym-grid(6/10, 20px)

.RightSide
  asym-grid(2/10, 20px, $last: true)


/* -- second row -- */

.left-side
  asym-grid(10/20, 10px)

.in-between
  asym-grid(7/20, 10px)

.right-side
  asym-grid(3/20, 10px, $last: true)


/* -- third row -- */

.left__side
  asym-grid(3/12, 2em)

.in__between
  asym-grid(3/12, 2em)

.right__side
  asym-grid(6/12, 2em, $last: true)

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

```stylus
.one
  asym-grid(4/12, 20px)

.two
  asym-grid(2/12, 20px, $push: 1/12)

.three
  asym-grid(4/12, 20px, $last: true)

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

```stylus
.one
  asym-grid(4/12, 20px)

.two
  asym-grid(2/12, 20px, $push: 6/12)

.three
  asym-grid(4/12, 20px, $pull: 3/12, $last: true)
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

### <a name="$center"></a> center
[back to top](#top)

Sure, you can center a column by moving it around using `$push` or `$pull`, but you can also simply use this => `asym-center()`

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
    asym-grid(1/3, 20px, $last: true)
  </div>
</div>
```

Stylus :

```stylus
.half
  asym-grid(1/2)
  asym-center()
  +below(tablet)
    asym-grid(1/3) // it will still be centered

.quarter
  asym-grid(1/4)
  asym-center()
  +below(tablet)
    asym-grid(1) // set the width to 100%

.third
  asym-grid(1/3, 20px)

.third--last
  asym-grid(1/3, 20px, $last: true)

```

#### Media-queries :

if you want a col to take 100% of the width below a certain breakpoint, use `asym-grid(1)`, **do not use** `asym-grid($full: true)`, the layout will break.

### <a name="$asym-nest"></a> Nesting
[back to top](#top)

Note: With a bubbly grid, you don't need no context stuff when nesting, so go wild.

Nothing special here, but just for the hell of it :

```stylus
.one
  asym-grid(4/12, 20px)

  .item
    sym-grid(2, 10px)

.two
  asym-grid(5/12, 20px)

.left
  asym-grid(4/10, 20px)

.right
  asym-grid(6/10, 20px, $last: true)

.three
  asym-grid(3/12, 20px, $last: true)

.left .item,
.right .item,
.three .item
  nest()
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

```stylus
.one
  asym-grid(2/10, 20px, $push: 8/10)

.two
  asym-grid(6/10, 20px)

.three
  asym-grid(2/10, 20px, $pull: 8/10, $last: true)

```

![asym-mq-b](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-b.png)

Below 760px :

If you get bored of all the pushing and pulling around, use $push or $pull => **reset**

```stylus
.one
  @media screen and (max-width: 760px)
    asym-grid(1/3, 20px, $push: reset)

.two
  @media screen and (max-width: 760px)
    asym-grid(1/3, 20px)

.three
  @media screen and (max-width: 760px)
    asym-grid(1/3, 10px, $pull: reset, $last: true)

```

![asym-mq-a](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-mq-a.png)

### <a name="$full"></a> $full
[back to top](#top)

- *default value is false*
- Use it if you want each col to take the full width of its container (e.g., when on mobile devices) :

```stylus
@media screen and (max-width: 320px)
  .one,
  .two,
  .three
    asym-grid($full: true)
```
![asym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/asym-full.png)

## <a name="last"></a> $last
[back to top](#top)

Like push and pull, you can also **reset** the 'last' parameter it if you wish. Let's take a look at this stupid grid :

```stylus
/* -- first row -- */

.one
  asym-grid(1/2, 20px)

.two
  asym-grid(1/2, 20px, $last: true)


/* -- second row -- */

.three
  asym-grid(1/2, 20px)

.four
  asym-grid(1/2, 20px, $last: true)


/* -- third row -- */

.five
  asym-grid(1/3, 20px)

.six
  asym-grid(1/3, 20px)

.seven
  asym-grid(1/3, 20px, $last: true)


/* -- fourth row -- */

.eight
  asym-grid(1/3, 20px)

.nine
  asym-grid(1/3, 20px)

.ten
  asym-grid(1/3, 20px, $last: true)

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
```stylus
@media and screen (max-width: 760px)

  /* -- first row -- */
  .one
    asym-grid(1/3, 20px)

  .two
    asym-grid(1/3, 20px, $last: reset)

  .three
    asym-grid(1/3, 20px, $last: true)


  /* -- second row -- */

  .four
    asym-grid(1/3, 20px, $last: reset)

  .five
    asym-grid(1/3, 20px)

  .six
    asym-grid(1/3, 20px, $last: true)


  /* -- third row -- */

  .seven
    asym-grid(1/4, 10px, $last: reset)

  .eight
    asym-grid(1/4, 10px)

  .nine
    asym-grid(1/4, 10px)

  .ten
    asym-grid(1/4, 10px, $last: true)

```
![asym-full](https://raw.githubusercontent.com/Alx-l/bubbly-grid/master/images/last-a.png)


## The End

Et voilà, I guess this is it...Now it's your turn to build some crazy layouts :)
