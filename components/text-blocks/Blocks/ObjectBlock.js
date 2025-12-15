import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import TextBlocks from '../index'
import Source from './shared/Source'
import { BsInfoCircle } from 'react-icons/bs'
import ManifestViewer from '../../manifest-viewer'
import { urlForImage } from '@/sanity/lib/utils'

const FigCaption = ({ children, label, description, item }) => {
  return (
    <figcaption
      className='flex flex-col max-w-2xl mx-auto text-center font-bold text-xl mb-2'
    >
      {label && (
        <div
          className='font-bold text-2xl md:text-3xl lg:text-4xl mb-2'
        >
          {label}
        </div>
      )}

      {description && (
        <div className='mb-4'>
          <TextBlocks
            value={description}
            className="text-center text-md md:text-lg lg:text-xl"
          />
        </div>
      )}

      {item && <Source {...item} />}

      {children}
    </figcaption>
  )
}

const ObjectBlock = (props) => {
  if (!props || props.disabled === true) {
    return null
  }

  const { _key, label, description, item, source, variant, locale = 'en' } = props

  if (variant === 'static-individual-captions') {
    return (
      <div
        key={_key}
        className="col-start-2 col-end-[-2] w-full mb-10 flex items-baseline justify-evenly flex-wrap gap-4"
      >
        {item.map((i) => (
          <figure
            key={i._key}
            className="w-full md:w-[30%]"
          >
            <div className="relative w-full aspect-square mb-4">
              {!i.internalRef && (
                <Image
                  src={urlForImage(i.image)?.url()}
                  className="object-contain"
                  fill
                  alt={i.image?.alt?.[locale] ?? ''}
                />
              )}
              {i.internalRef && (
                <Link
                  key={i._key}
                  href={`/id/${i.internalRef._ref}`}
                  className="block w-full h-full"
                >
                  <Image
                    id={i._key}
                    src={urlForImage(i.image)?.url()}
                    className="object-contain"
                    fill
                    alt={i.image?.alt?.[locale] ?? ''}
                  />
                </Link>
              )}
            </div>

            <FigCaption label={i.label} description={i.description} item={[i]}>
              <div className="pb-2 md:pb-0 mx-auto mt-2 mb-0 max-w-full">
                <TextBlocks value={i.source} className="font-normal text-md md:text-lg lg:text-xl " />
              </div>
            </FigCaption>
          </figure>
        ))}
      </div>
    )
  }

  if (variant === 'static-compare') {
    return (
      <figure
        key={item._key}
        className="w-full col-start-2 col-end-[-2]"
      >
        {item?.length === 0 && <div className="flex">Missing figures or not exactly two figures!</div>}

        {item?.length === 2 && (
          <div
            className="relative self-start mb-4"
          >
            <div
              className="max-w-full flex items-center justify-center"
            >
              {item.map((i) => (
                <div
                  className="relative h-[55vh]"
                  key={i._key}
                >
                  {i.image && (
                    <Image
                      key={i._key}
                      src={urlForImage(i.image)?.url()}
                      className="object-contain relative! h-full w-auto"
                      fill
                      alt={i.image?.alt?.[locale] ?? ''}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <FigCaption label={label} description={description} source={source}>
          <div
            className="hidden md:block text-md xl:text-lg pb-2 md:pb-0 mx-auto mt-2 mb-0 max-w-full"
          >
            <TextBlocks
              value={source}
              className="text-center text-md md:text-lg lg:text-xl"
            />
          </div>
        </FigCaption>
      </figure>
    )
  }

  return (
    <figure
      key={item._key}
      className="col-start-2 col-end-[-2] w-full mb-10 flex items-baseline justify-evenly flex-wrap gap-4"
    >
      {item?.length === 0 && <div className="flex">Missing figure</div>}

      {item && (
        <div className="relative self-start mb-4 w-full">
          {variant === 'mirador' && item?.[0]?.manifest && (
            <ManifestViewer
              manifest={item[0].manifest}
              canvasId={item[0].canvasUrl}
            />
          )}

          {variant === 'static' && (
            <div
              key={item?._key ?? 'static'}
              className="w-full flex items-center justify-evenly flex-wrap gap-4"
            >
              {item?.length > 1 && item.map((i) => (
                <div
                  key={i._key}
                  className="relative w-[48%]"
                >
                  {!i.internalRef && (
                    <Image
                      key={i._key}
                      src={urlForImage(i.image)?.url()}
                      fill
                      className="object-contain relative!"
                      alt={i.image?.alt?.[locale] ?? ''}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      key={i._key}
                      href={`/id/${i.internalRef._ref}`}
                      className="relative w-full h-full block"
                    >
                      <Image
                        key={i._key}
                        src={urlForImage(i.image)?.url()}
                        fill
                        className="object-contain relative!"
                        alt={i.image?.alt?.[locale] ?? ''}
                      />
                    </Link>
                  )}
                </div>
              ))}

              {item?.length === 1 && item.map((i) => (
                <div
                  key={i._key}
                  className="relative w-full"
                >
                  {!i.internalRef && (
                    <Image
                      src={urlForImage(i.image)?.url()}
                      fill
                      className="object-contain relative!"
                      alt={i.image?.alt?.[locale] ?? ''}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      href={`/id/${i.internalRef._ref}`}
                      className="relative w-full h-full block"
                    >
                      <Image
                        src={urlForImage(i.image)?.url()}
                        fill
                        className="object-contain relative!"
                        alt={i.image?.alt?.[locale] ?? ''}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <FigCaption label={label} description={description}>
        {item && item.filter(i => i.objectDescription).map((item, i) => (
          <div
            key={item.objectDescription?._id}
            className="text-md md:text-lg xl:text-lg pb-2 md:pb-0 mx-auto mt-2 mb-0 max-w-full"
          >
            <p>
              <BsInfoCircle
                className="mr-2 mt-0 inline"
                aria-hidden
              />
              <i>
                <Link href={`/id/${item.objectDescription?._id}`} className="">
                  {item.objectDescription?.label[locale] || 'Missing default language label'}
                </Link>
              </i>

              {item.objectDescription?.hasCurrentOwner?.length && `. ${item.objectDescription?.hasCurrentOwner[0].label[locale]}.`}
            </p>
          </div>
        ))}

        <div
          className="hidden md:block text-md xl:text-lg pb-2 md:pb-0 mx-auto mt-2 mb-0 max-w-full"
        >
          <TextBlocks
            value={source}
            className="text-center text-md md:text-lg lg:text-xl"
          />
        </div>
      </FigCaption>
    </figure>
  )
}

export default ObjectBlock
