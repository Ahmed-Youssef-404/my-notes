
const NotesSkeletonLoader: React.FC = () => {
    return (
        <div role="status" className="w-xs px-6 rounded-2xl m-2 animate-pulse skeletonLoader">
            <div className="h-2.5 rounded-full w-48 mb-4" />
            <div className="skeletonLoaderLines h-2 rounded-full max-w-[144px] mb-2.5" />
            <div className="skeletonLoaderLines h-2 rounded-full max-w-[180px] mb-2.5" />
            <div className="skeletonLoaderLines h-2 rounded-full max-w-[330px] mb-2.5" />
            <div className="skeletonLoaderLines h-2 rounded-full max-w-[300px] mb-2.5" />
            <div className="h-2 rounded-full max-w-[144px]" />
            <div className="h-2 rounded-full max-w-[144px]" />

            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default NotesSkeletonLoader
