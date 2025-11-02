import formatDate from "../../util/formatDate.js";

function UserProfile({user, isPending, isError}) {

    if (isPending) {
        return <div className=" space-y-8 animate-pulse">
            <h1 className="text-3xl font-bold text-white/40">User Information</h1>

            <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-xl border border-white/10 bg-white/5">

                <div className="w-28 h-28 rounded-full bg-white/10 border border-white/10"/>

                <div className="flex-1 grid sm:grid-cols-2 gap-6">

                    <div>
                        <div className="h-3 w-16 bg-white/10 rounded mb-2"></div>
                        <div className="h-5 w-32 bg-white/20 rounded"></div>
                    </div>

                    <div>
                        <div className="h-3 w-14 bg-white/10 rounded mb-2"></div>
                        <div className="h-5 w-48 bg-white/20 rounded"></div>
                    </div>

                    <div>
                        <div className="h-3 w-14 bg-white/10 rounded mb-2"></div>
                        <div className="h-7 w-20 bg-white/20 rounded"></div>
                    </div>

                    <div>
                        <div className="h-3 w-28 bg-white/10 rounded mb-2"></div>
                        <div className="h-5 w-36 bg-white/20 rounded"></div>
                    </div>

                </div>
            </div>
        </div>;
    }

    const {name, email, role, createdAt} = user;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white/90">User Information</h1>

            <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-xl border border-white/10 bg-white/5">

                <div
                    className="w-28 h-28 select-none rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 text-white text-4xl font-semibold flex items-center justify-center shadow-sm">
                    {name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 grid sm:grid-cols-2 gap-6 text-white/90">

                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/40">Name</p>
                        <p className="text-lg font-medium">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/40">Email</p>
                        <p className="text-lg font-medium break-all">{email}</p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/40">Role</p>
                        <span
                            className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-400/20">
          {role}
        </span>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-white/40">Account Created</p>
                        <p className="text-lg font-medium">
                            {formatDate(new Date(createdAt))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;