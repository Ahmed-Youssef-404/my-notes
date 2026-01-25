const ContentSkeletonLoader: React.FC = () => {
    return (
        <div
            role="status"
            className="animate-pulse max-w-6xl mx-auto p-4 space-y-6"
        >
            {/* Title */}
            <div className="flex justify-center">
                <div className="h-4 w-48 skeletonLoader rounded-full" />
            </div>

            <hr className=' text-[#8b8b8b] w-56 mx-auto mb-8' />

            {/* Content lines */}
            <div className="space-y-3">
                <div className="h-3 skeletonLoader rounded-full w-full" />
                <div className="h-3 skeletonLoader rounded-full w-[95%]" />
                <div className="h-3 skeletonLoader rounded-full w-[90%]" />
                <div className="h-3 skeletonLoader rounded-full w-[92%]" />
                {/* <div className="h-3 skeletonLoader rounded-full w-[80%]" /> */}
                <div className="h-3 skeletonLoader rounded-full w-[85%]" />
                <br />
                <div className="h-3 skeletonLoader rounded-full w-[92%]" />
                {/* <div className="h-3 skeletonLoader rounded-full w-full" /> */}
                <div className="h-3 skeletonLoader rounded-full w-[90%]" />
                {/* <div className="h-3 skeletonLoader rounded-full w-[80%]" /> */}
                <div className="h-3 skeletonLoader rounded-full w-[95%]" />
                {/* <div className="h-3 skeletonLoader rounded-full w-[85%]" /> */}
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default ContentSkeletonLoader;
