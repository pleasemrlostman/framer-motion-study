# Framer Motion

## 학습 목표

새로 시작하는 프로젝트에서 Framer Motion을 사용했지만 정확한 사용 방법이 아닌 사이트에서 제공해주는 example을 통해 기능 구현에 급급하여 만들었다. 이번 학습을 통해서 Framer Motion의 공식문서를 보며 공부하여 그 정확한 사용 방법을 익히는 것을 목표로 하겠다.

## How to animate?

### `motion` and `animate`

- framer motion 에서 가장 핵심이 되는 컴포넌트는 `motion` 컴포넌트이다. 그리고 해당 컴포넌트에 `animate` props를 전달하여 해당 컴포넌트에 애니메이션을 추가할 수 있다.
- `animate` 프롭스에 전달해주는 객체에는 모든 CSS 값을 수정하여 애니메이션 효과를 줄 수 있다.

### `Transitions`

- `animate` 프롭스 말고 `transitions` 프롭스도 존재하는데 해당 애니메이션이 어떻게 진행될지 필요한 값들을 해당 프롭스에 넣어주면 된다.

### `Enter Animation`

- `animate` 프롭스에 값을 넣으면 기존 최초의 style과 다르기 때문에 처음에 렌더링되면서 애니메이션이 시작된다. 만약 그것이 싫다면 초기 `initial` 프롭을 false로 설정하여 애니메이션을 비활성화할 수 있다.

### `Exit animations`

만약 특정 `motion` 컴포넌트가 DOM 에서 사라지면 애니메이션 효과가 아님 그 즉시 즉각적으로 사라지는 것을 확인할 수 있다. 만약 DOM 에서 사라질 때 특정한 animation으로 사라지게 하고 싶으면 해당 `motion` 컴포넌트를 `<AnimatePresence />` 컴포넌트에 children 값으로 넣어주도록 하자.

```tsx
function App() {
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        hide
      </button>
      <AnimatePresence>
        {isShow && (
          <motion.div
            animate={{ x: 100, y: 300, background: "blue" }}
            className="w-32 h-32 border border-red-500"
            transition={{ ease: "easeOut", duration: 2 }}
            exit={{ scale: 2, opacity: 0 }}
            initial={false}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### `Keyframes`

- 특정 css 프로퍼티에 배열을 이용하면 마치 `Keyframes` 를 이용하여 구현한 애니메이션 효과를 볼 수 있다.
  - **만약 최초값을 원래 값으로 하고 싶으면 배열의 0번 index 값에 null 을 넣어주어라**

```tsx
<motion.div
  animate={{ y: [null, 100, 0, 200, 50, 300] }}
  className="w-32 h-32 bg-slate-700 rounded-full"
></motion.div>
```

- 더 자세한 사용법을 위해 공식문서가 제공해주는 예시를 살펴보자

```tsx
<motion.div
  className="box"
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1,
  }}
/>
```

- 내가 헷갈렸던 부분은 `times` 부분이였는데 2초에서 각 `animate` 프롭스 값들이 어느 시점에 시작하는지 정해주는 배열이다.

### `Gesture animations`

- `Gesture animations` 는 클라이언트의 특정한 이벤트가 발생할 때 실행되는 이벤트라고 생각하면 편하다.

```tsx
<motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
  whileInView={{ opacity: 1 }}
/>
```

- 해당 코드를 분석하면 최초 값은 `opacity` 가 0.6이지만 `whileInview` 를 통해 해당 노드가 브라우저 화면에 보여질 때 `opacity` 값을 1로 변경한다, 그리고 `hover` 했을 때, `tap` 했을 때 각각 scale을 변경해준다.

```tsx
<motion.button
  className="w-32 h-32 bg-blue-500 text-green-50 "
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
  whileInView={{
    scale: [1, 3, 2, 1, 0.5],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"],

    transition: {
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeatDelay: 1,
    },

    // 각각 css 속성값에 넣어주는 방법
    transition: {
      rotate: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeatDelay: 1,
      },
    },
  }}
>
  button
</motion.button>
```

- 추가적으로 `Gesture animations` 들도 `animation` 이다 그러므로 각 프롭스 객체 프로퍼티에 `transition` 값을 넣어서 `key frames` 효과를 줄 수 있다.

- 또한 위에 작성된 코드처럼 각각의 css 값에 특정한 transition값을 넣어줄 수 있다.

### `Variants`

- 애니메이션을 객체로 설정하는 방법도 가능하다, 또한 때떄로 선언적으로 애니메이션을 정의해 DOM 전체 (하위 node tree 라고 생각하면 편하다)에 애니메이션을 적용할 수도 있다. 해당 섹션에서는 그러한 방법에 대해 알아보자

```tsx
// 우선 해당 변수를 선언해준다.
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

// 그리고 motion 컴포넌트에 variants 프롭스에 전달해준다.
<motion.div variants={variants} />;

// 우리 variants 의 key 값을 string 값으로 각각 넣어주면 해당 key 값의 프로퍼티가 각각 프롭스에 전달된다.
<motion.div initial="hidden" animate="visible" variants={variants} />;

// 즉 위의 코드는 아래 코드와 동일하다.
<motion.div initial={ opacity: 0 } animate={ opacity: 1 } variants={variants} />;

```

### `Propagation`

- 만약 `motion` 컴포넌트가 자식 컴포넌트를 가진다면 따로 자식 컴포넌트에게 프롭스값을 작성해주지 않는다면 자식 컴포넌트는 부모 컴포넌트의 `variants` 구조를 그대로 따른다.

```tsx
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

return (
  <motion.ul initial="hidden" animate="visible" variants={list}>
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
);
```
