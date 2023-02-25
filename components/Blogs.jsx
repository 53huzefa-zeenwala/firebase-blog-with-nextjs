import Link from "next/link";

export default function Blogs({ blogs }) {
    const description = (desc) => {
        let data = desc.split('>')[1].split('<')[0]
        return data.length >= 150 ? data.slice(0, 150) : data
    }
    const title = (data) => {
        return data.length >= 50 ? data.slice(0, 50) + "..." : data
    }
    return (
        <div className="flex flex-wrap justify-center gap-10 py-10 px-10">
            {blogs.map((data) => (
                <Link href={`/blog/${data.id}`} key={data.id} passHref className="min-h-full">
                    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-xl max-w-sm w-[24rem]">
                        <img
                            alt="Office"
                            src={data.image}
                            className="h-56 w-full object-cover"
                            loading="lazy"
                        />

                        <div className="bg-white p-4 sm:p-6">
                            <time className="block text-xs text-gray-500 pb-2">
                                {data.date}
                            </time>

                            <h3 className="mt-0.5 text-lg md:text-xl text-gray-900 font-cutiveMono tracking-tighter font-semibold">
                                {title(data.title)}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3 font-poppins">
                                {description(data.description)}...
                            </p>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    )
}
