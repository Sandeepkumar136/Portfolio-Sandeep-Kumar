import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import emailjs from "@emailjs/browser";
import servicesDetails from "./ServicesData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";

const SERVICE_ID = "service_vsrt3p5";
const TEMPLATE_ID = "template_w9wro4c";
const PUBLIC_KEY = "CY9OzP5uATTExwVyV";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 14, scale: 0.98 },
  show: {
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 32, mass: 0.7 },
  },
};

// Shake animation for invalid fields on submit (transform-only)
const shakeKeyframes = { x: [0, -8, 8, -6, 6, -3, 3, 0] };

// Custom Dropdown (single-select) with ARIA listbox pattern
function CustomDropdown({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Select a service",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value]
  );

  const listboxId = `${id || name}-listbox`;
  const getOptionId = (idx) => `${id || name}-opt-${idx}`;

  const openMenu = useCallback(() => {
    setOpen(true);
    const idx = selected
      ? options.findIndex((o) => o.value === selected.value)
      : 0;
    setHighlightedIndex(idx >= 0 ? idx : 0);
  }, [options, selected, id, name]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) {
        const idx = selected
          ? options.findIndex((o) => o.value === selected.value)
          : 0;
        setHighlightedIndex(idx >= 0 ? idx : 0);
      }
      return next;
    });
  }, [options, selected]);

  const selectByIndex = useCallback(
    (idx) => {
      const opt = options[idx];
      if (opt) {
        onChange(opt.value);
        closeMenu();
        // Return focus to the button after selection for SR/keyboard users
        buttonRef.current?.focus();
      }
    },
    [options, onChange, closeMenu]
  );

  // Click outside to close
  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [closeMenu]);

  // Keyboard on button
  const onButtonKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setHighlightedIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else
          setHighlightedIndex((i) =>
            i <= 0 ? options.length - 1 : i - 1
          );
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          openMenu();
        } else if (highlightedIndex >= 0) {
          selectByIndex(highlightedIndex);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;
      default:
        break;
    }
  };

  // Keyboard on list
  const onListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => (i <= 0 ? options.length - 1 : i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0) selectByIndex(highlightedIndex);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const chevronMotion = {
    initial: { rotate: 0 },
    animate: { rotate: open ? 180 : 0 },
    transition: { type: "tween", duration: 0.18, ease: "easeOut" },
  };

  const menuVariants = {
    closed: { scaleY: 0.8, y: -6, originY: 0 },
    open: {
      scaleY: 1,
      y: 0,
      originY: 0,
      transition: { type: "spring", stiffness: 460, damping: 34, mass: 0.7 },
    },
    exit: { scaleY: 0.9, y: -4, originY: 0 },
  };

  return (
    <div
      ref={wrapperRef}
      className={`bk-dd ${className}`}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      aria-activedescendant={
        open && highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined
      }
      tabIndex={-1}
    >
      <motion.button
        ref={buttonRef}
        id={`${id || name}-button`}
        type="button"
        className="bk-dd-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={toggleMenu}
        onKeyDown={onButtonKeyDown}
        whileFocus={{
          scale: 1.01,
          y: -1,
          boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
        }}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ willChange: "transform" }}
      >
        <span className="bk-dd-label">
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          className="bk-dd-chv"
          initial={chevronMotion.initial}
          animate={chevronMotion.animate}
          transition={chevronMotion.transition}
          style={{ willChange: "transform" }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="bk-dd-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onKeyDown={onListKeyDown}
            tabIndex={-1}
            style={{ willChange: "transform" }}
          >
            {options.map((opt, idx) => {
              const isSelected = selected?.value === opt.value;
              const isHighlighted = highlightedIndex === idx;
              return (
                <li
                  key={opt.value}
                  id={getOptionId(idx)}
                  role="option"
                  aria-selected={isSelected}
                  className={`bk-dd-item${
                    isHighlighted ? " is-highlighted" : ""
                  }`}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()} // keep focus
                  onClick={() => selectByIndex(idx)}
                >
                  {opt.label}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const Form = () => {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    isWhatsApp: false,
    email: "",
    address: "",
    street: "",
    postal: "",
    city: "",
    state: "",
    credentials: "",
    service: "", // stores selected service value (e.g., "frontend")
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);

  const selectedService = useMemo(
    () => servicesDetails.find((s) => s.value === form.service) || null,
    [form.service]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Basic validators
  const validate = (state) => {
    const next = {};
    if (!state.firstName.trim()) next.firstName = "You not filled";
    if (!state.lastName.trim()) next.lastName = "You not filled";
    if (!state.phone.trim()) next.phone = "You not filled";
    if (state.phone && !/^\d{10,}$/.test(state.phone)) {
      next.phone = "Enter valid phone (min 10 digits)";
    }
    return next;
  };

  const validateField = (name, value) => {
    const patch = {};
    if (name === "firstName") {
      patch.firstName = value.trim() ? "" : "You not filled";
    }
    if (name === "lastName") {
      patch.lastName = value.trim() ? "" : "You not filled";
    }
    if (name === "phone") {
      if (!value.trim()) patch.phone = "You not filled";
      else if (!/^\d{10,}$/.test(value))
        patch.phone = "Enter valid phone (min 10 digits)";
      else patch.phone = "";
    }
    setErrors((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setTriggerShake(true);
      setTimeout(() => setTriggerShake(false), 400);
      toast.warn("Please fix the highlighted fields before submitting.");
      return;
    }

    const fullName = [form.firstName, form.middleName, form.lastName]
      .filter(Boolean)
      .join(" ");
    const whatsappText = form.isWhatsApp ? "Yes" : "No";

    const templateParams = {
      firstName: form.firstName || "",
      middleName: form.middleName || "",
      lastName: form.lastName || "",
      fullName,
      phone: form.phone || "",
      isWhatsApp: whatsappText,
      email: form.email || "",
      address1: form.address || "",
      address2: form.street || "",
      postal: form.postal || "",
      city: form.city || "",
      state: form.state || "",
      credentials: form.credentials || "",
      service_value: form.service || "",
      service_label: selectedService?.label || "",
      service_price: selectedService?.price || "",
      service_cta: selectedService?.cta || "",
      submitted_at: new Date().toISOString(),
      subject: `New booking request: ${selectedService?.label || "Service"}`,
    };

    try {
      setIsSending(true);
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });
      console.log("EmailJS response:", res);
      toast("Message successfully sent!");
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        isWhatsApp: false,
        email: "",
        address: "",
        street: "",
        postal: "",
        city: "",
        state: "",
        credentials: "",
        service: "",
      });
      setErrors({});
    } catch (err) {
      console.error("EmailJS send failed:", err);
      toast.warn("Failed to send, please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bk-container">
        <motion.div
          className="bk-head-container"
          initial={{ y: 16, scale: 0.99 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          style={{ willChange: "transform" }}
        >
          <h3 className="bk-head">Fillup your Credential.</h3>
          <h6 className="bk-subtitle">Book your project now</h6>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          method="post"
          className="bk-form"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Name block */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            animate={triggerShake && (errors.firstName || errors.lastName) ? shakeKeyframes : {}}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Enter name</h4>
            <div className="bk-inp-cov">
              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`bk-nm-inp ${errors.firstName ? "bk-err" : ""}`}
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={(e) => validateField("firstName", e.target.value)}
                  autoComplete="given-name"
                  required
                  aria-invalid={!!errors.firstName}
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label
                  htmlFor="firstName"
                  className={`bk-nm-lb ${errors.firstName ? "bk-lb-err" : ""}`}
                >
                  First Name {errors.firstName ? `— ${errors.firstName}` : ""}
                </label>
              </div>

              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="middleName"
                  id="middleName"
                  className="bk-nm-inp"
                  value={form.middleName}
                  onChange={handleChange}
                  autoComplete="additional-name"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="middleName" className="bk-nm-lb">
                  Middle Name
                </label>
              </div>

              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`bk-nm-inp ${errors.lastName ? "bk-err" : ""}`}
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={(e) => validateField("lastName", e.target.value)}
                  autoComplete="family-name"
                  required
                  aria-invalid={!!errors.lastName}
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label
                  htmlFor="lastName"
                  className={`bk-nm-lb ${errors.lastName ? "bk-lb-err" : ""}`}
                >
                  Last Name {errors.lastName ? `— ${errors.lastName}` : ""}
                </label>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            animate={triggerShake && errors.phone ? shakeKeyframes : {}}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Contact Number</h4>
            <div className="bk-inp-cov-hp">
              <div className="bk-fm-inp-contain">
                <motion.input
                  type="tel"
                  name="phone"
                  id="phone"
                  className={`bk-nm-inp ${errors.phone ? "bk-err" : ""}`}
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={(e) => validateField("phone", e.target.value)}
                  autoComplete="tel-national"
                  inputMode="numeric"
                  pattern="\d{10,}"
                  required
                  aria-invalid={!!errors.phone}
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label
                  htmlFor="phone"
                  className={`bk-nm-lb ${errors.phone ? "bk-lb-err" : ""}`}
                >
                  Phone Number {errors.phone ? `— ${errors.phone}` : ""}
                </label>
              </div>

              <label className="bk-lb-wh" htmlFor="isWhatsApp">
                <input
                  type="checkbox"
                  name="isWhatsApp"
                  id="isWhatsApp"
                  className="bk-ch-fm"
                  checked={form.isWhatsApp}
                  onChange={handleChange}
                />
                Is it whatsapp number?
              </label>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">E-Mail</h4>
            <div className="bk-inp-cov">
              <div className="bk-fm-inp-contain">
                <motion.input
                  type="email"
                  placeholder="ex: example@example.com"
                  name="email"
                  id="email"
                  className="bk-nm-inp"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="email" className="bk-nm-lb">
                  Email
                </label>
              </div>
            </div>
          </motion.div>

          {/* Address lines */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Address</h4>
            <div className="bk-inp-cov">
              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="address"
                  id="address"
                  className="bk-nm-inp"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="address-line1"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="address" className="bk-nm-lb">
                  Address
                </label>
              </div>

              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="street"
                  id="street"
                  className="bk-nm-inp"
                  value={form.street}
                  onChange={handleChange}
                  autoComplete="address-line2"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="street" className="bk-nm-lb">
                  Street Address
                </label>
              </div>
            </div>
          </motion.div>

          {/* City/State/Postal */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Address</h4>
            <div className="bk-inp-cov">
              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="postal"
                  id="postal"
                  className="bk-nm-inp"
                  value={form.postal}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="postal" className="bk-nm-lb">
                  Postal/Zip Code
                </label>
              </div>

              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="city"
                  id="city"
                  className="bk-nm-inp"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="city" className="bk-nm-lb">
                  City
                </label>
              </div>

              <div className="bk-fm-inp-contain">
                <motion.input
                  type="text"
                  name="state"
                  id="state"
                  className="bk-nm-inp"
                  value={form.state}
                  onChange={handleChange}
                  autoComplete="address-level1"
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="state" className="bk-nm-lb">
                  State
                </label>
              </div>
            </div>
          </motion.div>

          {/* Credentials */}
          <motion.div
            className="bk-inp-contain-nme"
            variants={itemVariants}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Credentials</h4>
            <div className="bk-inp-cov">
              <div className="bk-fm-inp-contain">
                <motion.textarea
                  name="credentials"
                  id="credentials"
                  className="txt-ar-bk-fm"
                  value={form.credentials}
                  onChange={handleChange}
                  rows={4}
                  whileFocus={{
                    scale: 1.01,
                    y: -1,
                    boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
                  }}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <label htmlFor="credentials" className="bk-nm-lb">
                  Enter Credentials
                </label>
              </div>
            </div>
          </motion.div>

          {/* Service dropdown (custom) */}
          <motion.div
            className="bk-sl-contain"
            variants={itemVariants}
            style={{ willChange: "transform" }}
          >
            <h4 className="heading-bk-fm">Select Service</h4>

            <CustomDropdown
              id="service"
              name="service"
              className="bk-sl"
              options={servicesDetails}
              value={form.service}
              onChange={(val) => setForm((p) => ({ ...p, service: val }))}
              placeholder="Select a service"
            />

            {selectedService && (
              <div className="bk-service-meta" aria-live="polite">
                <p className="bk-service-price">{selectedService.price}</p>
                <p className="bk-service-cta">{selectedService.cta}</p>
              </div>
            )}
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="bk-submit"
            disabled={isSending}
            variants={itemVariants}
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: "transform" }}
            transition={{ type: "spring", stiffness: 600, damping: 32 }}
          >
            {isSending ? "Sending..." : "Submit"}
          </motion.button>
        </motion.form>
      </div>
    </>
  );
};

export default Form;
