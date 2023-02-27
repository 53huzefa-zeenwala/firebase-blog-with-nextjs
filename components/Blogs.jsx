import Link from "next/link";

export default function Blogs({ blogs }) {
    const description = (str) => {
        if ((str === null) || (str === '')) {
            return '';
        } else {
            str = str.toString();
        }
        const newStr = str.replace(/(<([^>]+)>)/gi, '')
        return newStr.length >= 150 ? newStr.slice(0, 150) + "..." : newStr
    }
    const title = (data) => {
        return data.length >= 50 ? data.slice(0, 50) + "..." : data
    }
    return (
        <div className="flex flex-wrap justify-center gap-10 py-10 px-16 sm:px-8">
            {blogs.map((data) => (
                <Link href={`/blogs/${data.id}`} key={data.id} passHref className="min-h-full">
                    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-xl max-w-sm sm:w-[24rem] w-80">
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
