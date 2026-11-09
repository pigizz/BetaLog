const labels = ['Wrecked', 'Tired', 'Okay', 'Good', 'Fired up']

// Energy level shown as five climbing holds. Interactive when onChange is passed.
export default function EnergyHolds({ value, onChange, size = 'md' }) {
  const dim = size === 'sm' ? 'h-3 w-3' : 'h-8 w-8'

  if (!onChange) {
    return (
      <span className="inline-flex items-center gap-1" title={`Energy: ${labels[value - 1]}`}>
        {labels.map((_, i) => (
          <span key={i} className={`${dim} rounded-full ${i < value ? 'bg-moss' : 'bg-rock/15'}`} />
        ))}
        <span className="sr-only">Energy {value} of 5</span>
      </span>
    )
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold">
        Energy: <span className="font-normal text-rock/70">{labels[value - 1]}</span>
      </legend>
      <div className="mt-2 flex gap-2" role="radiogroup">
        {labels.map((label, i) => {
          const level = i + 1
          const filled = level <= value
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={level === value}
              aria-label={`${level} â€“ ${label}`}
              onClick={() => onChange(level)}
              className={`${dim} rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 transition-transform active:scale-90 ${
                filled ? 'border-moss bg-tea' : 'border-rock/20 bg-white hover:border-moss/50'
              }`}
              style={{ transform: `rotate(${i * 37}deg)` }}
            />
          )
        })}
      </div>
    </fieldset>
  )
}