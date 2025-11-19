import FormSkeleton from "../components/Skaletons/FormSkeleton.jsx";
import FormHeaderSkeleton from "../components/Skaletons/FormHeaderSkaleton.jsx";

function Test() {
    return <div className="px-5">
        <FormHeaderSkeleton/>
        <div className="space-y-3">
            <FormSkeleton/>
            <FormSkeleton/>
            <FormSkeleton/>
            <FormSkeleton/>
            <FormSkeleton/>
            <FormSkeleton/>
        </div>
    </div>;
}

export default Test;