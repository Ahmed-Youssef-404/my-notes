const PageInfoSkeleteonLoader: React.FC = () => {
    return (
        <div role="status" className="animate-pulse my-6">
            <div className="skeletonLoader h-2.5 bg-default rounded-full max-w-[640px] mb-2.5 mx-auto" />
            <div className="skeletonLoader h-2.5 bg-default rounded-full max-w-[540px] mx-auto" />

            <div className="flex items-center justify-center mt-4">
                <div className="skeletonLoader w-20 h-2.5 rounded-full me-3" />
                <div className="skeletonLoader w-24 h-2 rounded-full" />
            </div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default PageInfoSkeleteonLoader;
