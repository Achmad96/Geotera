import AnimatedText from "@/components/animations/AnimatedText";

export default function OrdersSection() {
  return (
    <section
      id="about"
      className="flex h-svh w-full max-w-full items-center justify-center"
    >
      <AnimatedText
        className="-z-10 w-1/2 text-center text-2xl tracking-wider max-sm:w-[80%]"
        text={
          "Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living."
        }
        once={true}
        underlineWords={[11, 12]}
      />
    </section>
  );
}
