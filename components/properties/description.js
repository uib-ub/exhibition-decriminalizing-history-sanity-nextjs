export default function Description(props) {
  if (!props) {
    return null
  }

  return (
    <div className="max-w-xl mb-5">
      <p
        className="text-lg sm:text-lg md:text-2xl xl:text-2xl"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  )
}
