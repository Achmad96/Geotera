import AnimatedText from "@/components/animations/AnimatedText";

export default function OrdersSection() {
    return (
        <section id="about" className="flex justify-center items-center w-full max-w-full h-svh">
            <AnimatedText
                className="text-2xl -z-10 tracking-wider text-center w-1/2 max-sm:w-[80%]"
                text={"Through our innovative technologies, we aim to empower consumers to make responsible choices that will reduce their carbon footprint and promote sustainable living."}
                once={true}
                underlineWords={[11, 12]}
            />
        </section>
    );
}
