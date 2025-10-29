import formatDate from "../../util/formatDate.js";

function UserProfile({user}) {
    const {name, email, role, createdAt} = user;

    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold text-white/90">User Information</h1>

            <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-xl border border-white/10 bg-white/5">

                {/* Profile Icon */}
                <div
                    className="w-28 h-28 select-none rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 text-white text-4xl font-semibold flex items-center justify-center shadow-sm">
                    {name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
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
                            {formatDate(createdAt)}
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default UserProfile;