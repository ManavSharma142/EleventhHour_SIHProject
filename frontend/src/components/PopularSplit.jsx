import { motion } from "framer-motion"
import { Dumbbell, Layers, SplitSquareHorizontal } from "lucide-react"

export default function PopularSplits() {
  const splits = [
    { title: "Bro Split (5 Day Program)", icon: Dumbbell },
    { title: "Classic Push-Pull-Leg Program", icon: Layers },
    { title: "Upper-Lower Split (4 Day Program)", icon: SplitSquareHorizontal },
  ]

  return (
    <div className="w-80">
      <h2 className="text-2xl font-bold mb-6 text-white">Explore Popular Splits</h2>

      <div className="space-y-4">
        {splits.map((split, i) => {
          const Icon = split.icon
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 cursor-pointer rounded-xl p-4 shadow-md hover:shadow-lg hover:from-slate-700 hover:to-slate-600 transition-all flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Icon size={20} />
              </div>
              <h3 className="font-medium text-slate-100">{split.title}</h3>
            </motion.div>
          )
        })}

        <div className="pt-8 text-center">
          <p className="text-slate-400 text-sm italic">✨ More will be added soon!</p>
        </div>
      </div>
    </div>
  )
}
